## Structure

GOAL
- Modular CSS utility classes > 
- Components > 
- self-adapting CSS wrappers (engulf components, auto-bleed/ element containers)
-  global css (orchestrates size/variable adjustment with cascade layers)
split:
- theme.css (colors)
- core/base/global.css
- modularity/adjustments css file? (auto)
- or utilities file
layers:
- global
- utilities
- component-level

TOOLS TO USE IN ORGANIZING
- root variables > component variables (override)
- layer at-rules (utilities)
- container queries
- anchor positioning
- grid/subgrid

UTILTY BREAKDOWN
- flex
- grid

define layers/surfaces ELEVATION (auto-gap/nesting)

level0 gap: 32
level1 gap: 24
level2 gap: 16
level3 gap: 8

convert colors to oklch
## Naming Conventions

## 