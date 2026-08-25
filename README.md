# RePaper AI

Dependency-free browser prototype for an intelligent paper reuse system.

Open `index.html`, upload a paper image or use the sample, adjust school demand, and print the proposed layout.

The scanner reads uploaded pixels through a browser canvas and computes deterministic blank, marked, and edge-damage estimates in `scanner.js`. It also labels scans as blank, printed, handwritten, or damaged. The lightweight heuristic is suitable for a prototype; a production pilot should replace it with a validated segmentation/model pipeline.

Run the fixture tests with `npm test`.

Recommended next steps: collect and label real school images; train/test a segmentation model; convert masks to polygons; use a nesting algorithm for A5, memo, or flashcard templates; score `recovered_area × demand − cutting_waste − handling_cost`; validate manually before connecting a guarded cutter; store aggregate metrics rather than student worksheet images by default.
