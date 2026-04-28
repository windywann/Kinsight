# Device Base Info Model Hover Design

**Goal**
- Update the `模型` field in the device task detail page base-info section so it behaves like the existing `实时特征` and `离线特征` fields.
- Keep the model list content aligned with the evaluation-report model tabs.

## Confirmed UX
- Replace the plain-text `模型` value with `i 展开查看 (6)`.
- Hovering the trigger shows a white popover.
- The popover content is a single vertical list, with one model per line.
- The model order must match the evaluation-report tabs exactly:
  1. `NN_small`
  2. `NN_large`
  3. `Dragonnet`
  4. `TLearner_xgboost`
  5. `XLearner`
  6. `CausalForest`

## Approach
- Reuse the existing base-info hover structure already used by `实时特征` and `离线特征` in `pages/device/task-detail-demo.html`.
- Add a small list-specific style in `assets/css/device/task-detail-demo.css` so the model popover renders as stacked rows instead of wrapped tags.
- Keep the evaluation-report tab content unchanged; only mirror its model names and order in the base-info hover list.

## Scope Boundaries
- Do not change the evaluation-report tabs themselves.
- Do not change model metric data, loss behavior, or feature-importance behavior.
- Do not introduce new libraries or new interaction patterns.

## Validation
- Open `pages/device/task-detail-demo.html`.
- Verify the `模型` field now shows `展开查看 (6)`.
- Hover the trigger and verify the popover is white, visible, and shows one model per line.
- Verify the model names and order match the evaluation-report tabs.
