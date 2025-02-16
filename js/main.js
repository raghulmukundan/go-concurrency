// Wait for Prism to load
window.addEventListener("load", () => {
  const contentContainer = document.getElementById("content-container");
  const navLinks = document.querySelectorAll(".nav-link");

  window.loadContent = async function (page) {
    try {
      contentContainer.innerHTML = '<div class="loading">Loading...</div>';

      // Get the repository name from the URL path
      const pathSegments = window.location.pathname.split("/");
      const repoName = pathSegments[1]; // This will be 'go-concurrency-notes' or empty for root

      // Construct the base path
      let basePath = "";
      if (repoName && window.location.hostname.includes("github.io")) {
        basePath = `/${repoName}`;
      }

      // Construct the full URL
      const url = `${basePath}/pages/${page}.html`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();
      contentContainer.innerHTML = content;

      // Now find all code sections in the loaded content
      const codeSections = contentContainer.querySelectorAll(".code-section");
      console.log("Code section:", codeSections);
      // Process each code section
      for (const section of codeSections) {
        // Get the code file path from the data attribute
        console.log("section:", section);
        const codeContainer = section.querySelector(".code-container");
        const codePath = codeContainer.dataset.codePath;

        if (!codePath) {
          console.warn("Code section found without a code path:", section);
          continue;
        }

        try {
          // Fetch the code file
          const fullCodePath = `https://raw.githubusercontent.com/raghulmukundan/go-concurrency/refs/heads/main/code/${codePath}`;
          console.log("Fetching code from:", fullCodePath);
          const codeResponse = await fetch(fullCodePath);
          if (!codeResponse.ok) {
            throw new Error(`Failed to load code from ${fullCodePath}`);
          }
          const code = await codeResponse.text();

          // Determine language from file extension
          const fileExtension = codePath.split(".").pop();
          const languageClass = fileExtension;

          // Create the code toolbar structure
          const codeToolbar = document.createElement("div");
          codeToolbar.className = "code-toolbar";

          const pre = document.createElement("pre");
          const codeElement = document.createElement("code");

          // Create toolbar container
          const toolbar = document.createElement("div");
          toolbar.className = "toolbar";

          const expandToolbarItem = document.createElement("div");
          expandToolbarItem.className = "toolbar-item";
          const expandButton = document.createElement("button");
          expandButton.type = "button";
          expandButton.innerHTML = '<i class="fa-solid fa-expand"></i>'; // Expand icon
          expandToolbarItem.appendChild(expandButton);

          // When handling expand click, update the icon
          expandButton.addEventListener("click", () => {
            const isExpanded = codeToolbar.classList.toggle("expanded");
            overlay.classList.toggle("active");
            // Change icon based on state
            expandButton.innerHTML = isExpanded
              ? '<i class="fa-solid fa-compress"></i>' // Collapse icon
              : '<i class="fa-solid fa-expand"></i>'; // Expand icon
            document.body.style.overflow = isExpanded ? "hidden" : "";
          });

          // Add escape key handler
          document.addEventListener("keydown", (e) => {
            if (
              e.key === "Escape" &&
              codeToolbar.classList.contains("expanded")
            ) {
              // Reset expanded state
              codeToolbar.classList.remove("expanded");
              // Remove overlay
              overlay.classList.remove("active");
              // Update icon back to expand icon
              expandButton.innerHTML = '<i class="fa-solid fa-expand"></i>';
              // Re-enable body scrolling
              document.body.style.overflow = "";
            }
          });

          // Create custom copy button
          const copyToolbarItem = document.createElement("div");
          copyToolbarItem.className = "toolbar-item";
          const copyButton = document.createElement("button");
          copyButton.type = "button";
          copyButton.className = "custom-copy-to-clipboard";
          // Start with the copy icon
          copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
          copyToolbarItem.appendChild(copyButton);

          // Enhanced copy button functionality using the Clipboard API
          copyButton.addEventListener("click", async () => {
            try {
              // Attempt to copy the code
              await navigator.clipboard.writeText(code);

              // Show success state with check icon
              copyButton.innerHTML = '<i class="fa-solid fa-check"></i>';

              // Add success class for green background effect
              copyButton.classList.add("copy-success");

              // Reset back to copy icon after 2 seconds
              setTimeout(() => {
                copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
                copyButton.classList.remove("copy-success");
              }, 2000);
            } catch (err) {
              console.error("Failed to copy code:", err);

              // Show error state with x icon
              copyButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

              // Add error class for red background effect
              copyButton.classList.add("copy-error");

              // Reset back to copy icon after 2 seconds
              setTimeout(() => {
                copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
                copyButton.classList.remove("copy-error");
              }, 2000);
            }
          });
          // Add buttons to toolbar
          toolbar.appendChild(expandToolbarItem);
          toolbar.appendChild(copyToolbarItem);

          // Assemble the structure
          pre.appendChild(codeElement);
          codeToolbar.appendChild(pre);
          codeToolbar.appendChild(toolbar);

          // Create overlay (if it doesn't exist)
          let overlay = document.querySelector(".code-overlay");
          if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "code-overlay";
            document.body.appendChild(overlay);
          }

          // Add overlay click handler
          overlay.addEventListener("click", () => {
            if (codeToolbar.classList.contains("expanded")) {
              // Reset expanded state
              codeToolbar.classList.remove("expanded");
              // Remove overlay
              overlay.classList.remove("active");
              // Update icon back to expand icon
              expandButton.innerHTML = '<i class="fa-solid fa-expand"></i>';
              // Re-enable body scrolling
              document.body.style.overflow = "";
            }
          });

          // Set up the code element
          codeElement.className = `language-${languageClass}`;
          codeElement.textContent = code;

          // CREATE WRAPPER AND ADD PLAYGROUND LINK HERE
          // Create a wrapper to hold both code block and playground link
          const codeWrapper = document.createElement("div");
          codeWrapper.className = "code-section-wrapper";

          // Add the code block to wrapper
          codeWrapper.appendChild(codeToolbar);

          // Add embedded playground if it's a Go file
          if (languageClass === "go") {
            // Create execution section container
            const executionSection = document.createElement("div");
            executionSection.className = "execution-section";

            // Create a container for the run button to help with alignment
            const buttonContainer = document.createElement("div");
            buttonContainer.className = "run-button-container";

            // Create run button with more subtle styling
            const runButton = document.createElement("button");
            runButton.className = "run-button";
            runButton.innerHTML = `
                <i class="fa-solid fa-play" style="font-size: 0.85rem;"></i>
                <span>Run Code</span>
                 `;

            // Add button to its container
            buttonContainer.appendChild(runButton);

            // Create output display with improved placeholder
            const outputDisplay = document.createElement("div");
            outputDisplay.className = "output-display";
            outputDisplay.innerHTML = `
                    <div class="output-placeholder">
                        <i class="fa-regular fa-terminal" style="margin-right: 0.5rem;"></i>
                        Program output will appear here
                    </div>
                `;

            // Add execution handling
            runButton.addEventListener("click", async () => {
              try {
                // Show loading state
                outputDisplay.innerHTML =
                  '<div class="loading">Running code...</div>';
                runButton.disabled = true;

                // Get the code from our code element
                const codeContent = code; // Using the code variable from parent scope

                // Make request to Go Playground API
                const response = await fetch(
                  "https://play.golang.org/compile",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `version=2&body=${encodeURIComponent(codeContent)}`,
                  }
                );

                if (!response.ok) {
                  throw new Error("Compilation failed");
                }

                const result = await response.json();

                // Display the output
                if (result.Events && result.Events.length > 0) {
                  const output = result.Events.map((event) => {
                    return `<div class="output-line ${event.Kind}">${event.Message}</div>`;
                  }).join("");
                  outputDisplay.innerHTML = output;
                } else {
                  outputDisplay.innerHTML =
                    '<div class="no-output">Program ran successfully with no output</div>';
                }
              } catch (error) {
                outputDisplay.innerHTML = `
              <div class="error-message">
                  Error running code: ${error.message}
              </div>
          `;
              } finally {
                runButton.disabled = false;
              }
            });

            // Assemble the execution section
            executionSection.appendChild(buttonContainer);
            executionSection.appendChild(outputDisplay);

            // Add execution section to wrapper
            codeWrapper.appendChild(executionSection);
          }
          // Clear existing content and add the new code block
          codeContainer.innerHTML = "";
          codeContainer.appendChild(codeWrapper);

          // Apply Prism highlighting (only for syntax highlighting)
          if (window.Prism) {
            Prism.highlightElement(codeElement);
          }
        } catch (error) {
          console.error("Error loading code for section:", error);
          section.innerHTML = `<div class="error-message">Failed to load code: ${error.message}</div>`;
        }
      }

      let currentSelectedLink;
      // Update active state
      navLinks.forEach((link) => {
        link.classList.remove("active");
        navSection = link.closest(".nav-section");
        navSection.classList.remove("active");
        navSection.children[0].classList.remove("active");
        if (link.dataset.page === page) {
          currentSelectedLink = link;
        }
      });

      // Update URL without page reload
      history.pushState({ page }, "", `#${page}`);
      currentPage = page;

      // Check if Prism is loaded before calling
      if (typeof Prism !== "undefined") {
        Prism.highlightAll();
      }

      const currentNavSection = currentSelectedLink.closest(".nav-section");
      currentNavSection.classList.add("active");
      currentNavSection.children[0].classList.add("active");
      currentSelectedLink.classList.add("active");
    } catch (error) {
      console.error("Error loading content:", error);
      contentContainer.innerHTML = `
                <div class="section">
                    <h1>Error Loading Content</h1>
                    <p>Unable to load the requested content. Please try again later.</p>
                    <p>Error details: ${error.message}</p>
                </div>`;
    }
  };

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      loadContent(page);
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
      loadContent(event.state.page);
    }
  });

  // Load initial content based on hash or default to intro
  const hash = window.location.hash.slice(1) || "intro";
  loadContent(hash);
});

function navigate(direction) {
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = Array.from(navLinks).map((link) => link.dataset.page);
  const currentPage = window.location.hash.slice(1) || pages[0];
  const currentIndex = pages.indexOf(currentPage);
  if (direction === "next" && currentIndex < pages.length - 1) {
    loadContent(pages[currentIndex + 1]);
  } else if (direction === "prev" && currentIndex > 0) {
    loadContent(pages[currentIndex - 1]);
  }
}

// --- Expand/Collapse Navigation Sections ---
const sectionHeaders = document.querySelectorAll(".section-header");
sectionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const section = header.parentElement;
    // Toggle the clicked section; collapse others
    if (section.classList.contains("active")) {
      section.classList.remove("active");
    } else {
      document
        .querySelectorAll(".nav-section")
        .forEach((sec) => sec.classList.remove("active"));
      section.classList.add("active");
    }
  });
});
