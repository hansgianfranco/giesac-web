#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
VIOLATIONS=0

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "🔍 Linting inline styles and event handlers..."

# ---- Check HTML: inline styles ----
HTML_FILES=$(git -C "$PROJECT_DIR" ls-files '*.html' 2>/dev/null || find "$PROJECT_DIR" -name '*.html' -not -path '*/node_modules/*')
for f in $HTML_FILES; do
  abs="$PROJECT_DIR/$f"
  [[ -f "$abs" ]] || abs="$f"
  # Excluir style="..." en paths SVG:
  #   - style="fill:none;stroke:var(...)..." → atributo de presentación SVG (único modo de usar CSS vars en SVG)
  #   - style="animation:..."               → animation no es atributo SVG nativo
  matches=$(grep -n 'style="' "$abs" | grep -v 'style="fill:none;stroke:' | grep -v 'style="animation:' || true)
  if [[ -n "$matches" ]]; then
    echo -e "${RED}✗ INLINE STYLE in $f:${NC}"
    echo "$matches" | while read -r line; do
      echo "  $line"
    done
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
done

# ---- Check HTML: inline event handlers ----
EVENT_HANDLERS="onmouseover|onmouseout|onclick|onchange|onsubmit|onload|onfocus|onblur|onkeydown|onkeyup|onkeypress|ondblclick|oncontextmenu|onscroll|onresize|onselect|oninput|onerror"
for f in $HTML_FILES; do
  abs="$PROJECT_DIR/$f"
  [[ -f "$abs" ]] || abs="$f"
  matches=$(grep -nE "($EVENT_HANDLERS)=" "$abs" || true)
  if [[ -n "$matches" ]]; then
    echo -e "${RED}✗ INLINE EVENT HANDLER in $f:${NC}"
    echo "$matches" | while read -r line; do
      echo "  $line"
    done
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
done

# ---- Check JS: programmatic style manipulation ----
JS_FILES=$(git -C "$PROJECT_DIR" ls-files '*.js' 2>/dev/null || find "$PROJECT_DIR" -name '*.js' -not -path '*/node_modules/*')
for f in $JS_FILES; do
  abs="$PROJECT_DIR/$f"
  [[ -f "$abs" ]] || abs="$f"
  matches=$(grep -n '\.style\.' "$abs" || true)
  if [[ -n "$matches" ]]; then
    echo -e "${RED}✗ PROGRAMMATIC STYLE in $f (use classList instead):${NC}"
    echo "$matches" | while read -r line; do
      echo "  $line"
    done
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
done

# ---- Result ----
if [[ $VIOLATIONS -gt 0 ]]; then
  echo ""
  echo -e "${RED}✗ Found $VIOLATIONS violation(s).${NC}"
  echo "  Move inline styles to CSS classes and programmatic styles to classList."
  exit 1
else
  echo -e "${GREEN}✓ No inline style violations found.${NC}"
  exit 0
fi
