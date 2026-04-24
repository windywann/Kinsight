# Device Evaluation Report Interaction Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move model tabs to the top of the device task detail evaluation report and make the selected model drive the metrics table highlight, loss chart, and feature-importance content, while adding a developer-only info tooltip for problem type.

**Architecture:** Keep the page as static HTML/CSS/Vanilla JS. Promote model selection to a single top-level state in `assets/js/device/task-detail-demo.js`, then use that state to update all evaluation-report sections. Keep existing visual styles where possible and only extend markup/styles needed for the new interaction.

**Tech Stack:** HTML, CSS, Vanilla JavaScript

---

### Task 1: Restructure evaluation report markup

**Files:**
- Modify: `pages/device/task-detail-demo.html`

**Step 1: Move model tabs to the evaluation report top area**
- Add a new top row above the current "关键指标 / 问题类型" line.
- Render `模型：` on the left and place all model tabs after it.
- Remove the duplicate model-tab block from inside the `loss 曲线` section.

**Step 2: Add developer-only problem type hint trigger**
- Keep the existing `分类 / 回归` switch.
- Add an info icon on the right side of the `问题类型` label.
- Add tooltip copy explaining this switch is only for frontend-development display branching and is not shown online.

**Step 3: Preserve existing data hooks**
- Keep `data-model`, `data-model-row`, and `data-problem-table` hooks.
- Add any missing wrapper IDs/classes needed by the new top model switch area.

**Step 4: Manual verification**
- Open `pages/device/task-detail-demo.html`.
- Verify the model tabs appear at the top of the evaluation report.
- Verify the problem type label has an info icon and tooltip.

### Task 2: Extend evaluation report styles

**Files:**
- Modify: `assets/css/device/task-detail-demo.css`

**Step 1: Style the new top model switch area**
- Add layout styles for the new `模型：` row.
- Reuse existing tab visual language where possible.
- Ensure the top model tabs wrap cleanly on smaller widths.

**Step 2: Style the problem type info icon and tooltip**
- Add a small inline info icon next to the label.
- Add hover tooltip styles consistent with existing hover/popover patterns in this file.

**Step 3: Keep existing highlighted-row behavior**
- Preserve `.eval-current-row` visuals.
- Only adjust spacing/layout if required by the new structure.

**Step 4: Manual verification**
- Refresh the page and verify the new top row spacing matches surrounding cards.
- Hover the info icon and verify the tooltip is readable and not clipped.

### Task 3: Centralize selected-model state and table/loss sync

**Files:**
- Modify: `assets/js/device/task-detail-demo.js`

**Step 1: Refactor model selection entry point**
- Replace the current loss-section-local tab handling with a single top-level selected-model source.
- Use the top model tabs as the only model switch trigger.

**Step 2: Keep table highlight in sync**
- When model changes, update all rows with `data-model-row`.
- Ensure the selected model row remains highlighted in both classification and regression tables.

**Step 3: Keep loss chart in sync**
- Show chart or empty state based on the selected model’s `data-has-loss` capability.
- Keep legend state aligned with the selected model’s visible lines.
- Ensure loss content updates when switching between models with and without curves.

**Step 4: Manual verification**
- Click each model tab.
- Verify the highlighted metrics row changes every time.
- Verify tree models show the empty loss message and NN models show the chart.

### Task 4: Add model-driven feature-importance mock data

**Files:**
- Modify: `assets/js/device/task-detail-demo.js`
- Modify: `pages/device/task-detail-demo.html` (only if container hooks are needed)

**Step 1: Define per-model mock datasets**
- Create a mock map keyed by model name.
- Give each model a visibly different top-feature ranking and bar widths.

**Step 2: Render feature-importance from selected model**
- Replace the static importance rows with JS-rendered content or update them dynamically.
- Keep the existing chart shell and axis styling.

**Step 3: Sync feature importance to model changes**
- Re-render the importance section whenever the selected model changes.
- Do not change the highlighted row style behavior in the table.

**Step 4: Manual verification**
- Switch across several models.
- Verify the feature-importance bars and labels clearly change with the selected model.

### Task 5: Final verification

**Files:**
- Modify: `pages/device/task-detail-demo.html`
- Modify: `assets/css/device/task-detail-demo.css`
- Modify: `assets/js/device/task-detail-demo.js`

**Step 1: Run static checks**
Run: read lints for the three edited files.
Expected: no obvious diagnostics.

**Step 2: Browser verification**
- Open `http://localhost:7001/pages/device/task-detail-demo.html`.
- Verify:
  - top model tabs are above the rest of evaluation content
  - `模型：` label is shown
  - problem-type info tooltip appears on hover
  - model switching updates row highlight, loss content, and feature importance together

**Step 3: Keep scope tight**
- Do not change unrelated tabs.
- Do not introduce new libraries.
- Do not alter existing metric values unless required for the selected-model experience.
