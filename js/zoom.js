// Use DOMContentLoaded to ensure the script runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Check if the zoom control already exists to prevent duplicates if script is run multiple times
    if (document.querySelector('.zoom-controls')) {
        // If controls already exist, initialize the logic
        initZoomController();
    } else {
         // If controls were not in the initial HTML (e.g., added dynamically),
         // set up an observer to wait for them or the target element.
         // NOTE: In the provided HTML, the controls *are* in the initial body,
         // so this else block might not be strictly necessary but is good
         // for robustness if the HTML structure changes or content is dynamic.
         setupMutationObserver();
    }
});

// Function to initialize the zoom controller logic
function initZoomController() {
    // Target elements to zoom - now includes #screen-container and .popup
    const targetElements = document.querySelectorAll('#screen-container, .popup');
    if (targetElements.length === 0) {
        console.warn("Target elements ('#screen-container', '.popup') not found. Setting up observer.");
        // If target elements are not found, set up observer to wait for them
        setupMutationObserver();
        return; // Exit if target not found initially
    }

    // Get control elements - they are already in the HTML
    const zoomControls = document.querySelector('.zoom-controls');
    const dragHandle = zoomControls.querySelector('.drag-handle'); // Get the drag handle element
    const zoomSlider = document.getElementById('zoom-slider');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    const scrollCenterBtn = document.getElementById('scroll-center'); // Get the new scroll center button
    const zoomPercentage = document.getElementById('zoom-percentage');

    // Set initial scale - load from localStorage if available, default to 100%
    let currentZoom = parseInt(localStorage.getItem('screenZoomLevel')) || 100;

    // Apply the initial zoom level
    applyZoom();

    // Load and apply saved scroll position
    const savedScrollY = localStorage.getItem('screenScrollY');
    if (savedScrollY !== null) {
        window.scrollTo(0, parseInt(savedScrollY));
    }

    // Function to apply zoom to the target elements and update controls
    function applyZoom() {
        const scale = currentZoom / 100;
        // Iterate over all target elements and apply the transform
        targetElements.forEach(element => {
            // Apply transform origin to center for consistent scaling
            element.style.transformOrigin = 'center center';

            // Check if the element is a popup and apply centering translation along with scale
            if (element.classList.contains('popup')) {
                // Apply translate(-50%, -50%) for centering and then scale
                element.style.transform = `translate(-50%, -50%) scale(${scale})`;
            } else {
                // For other elements, just apply the scale
                element.style.transform = `scale(${scale})`;
            }
        });

        // Update the slider position
        zoomSlider.value = currentZoom;
        // Update the percentage text display
        zoomPercentage.textContent = `${currentZoom}%`;
        // Save the current zoom level to localStorage
        localStorage.setItem('screenZoomLevel', currentZoom);
    }

    // --- Event Listeners for Controls ---

    // Slider input changes zoom level
    zoomSlider.addEventListener('input', function() {
        currentZoom = parseInt(this.value); // Get integer value from slider
        applyZoom(); // Apply the new zoom
    });

    // Zoom In button increases zoom level
    zoomInBtn.addEventListener('click', function() {
        currentZoom = Math.min(currentZoom + 5, 130);
        applyZoom(); // Apply the new zoom
    });

    // Zoom Out button decreases zoom level
    zoomOutBtn.addEventListener('click', function() {
        currentZoom = Math.max(currentZoom - 5, 30);
        applyZoom(); // Apply the new zoom
    });

    // Reset button sets zoom level back to 100%
    zoomResetBtn.addEventListener('click', function() {
        currentZoom = 100; // Reset to 100
        applyZoom(); // Apply the new zoom
    });

    // Event listener for the new scroll center button
    if (scrollCenterBtn) { // Check if the button exists
        scrollCenterBtn.addEventListener('click', function() {
            // Calculate the center scroll position
            const centerScrollY = (document.body.scrollHeight - window.innerHeight) / 2;
            // Scroll to the center position
            window.scrollTo({
                top: centerScrollY,
                behavior: 'smooth' // Optional: for smooth scrolling
            });
        });
    }


    // --- Draggable Controls Logic ---
    // Variables for dragging
    let isDragging = false;
    let offsetX, offsetY;

    // Mouse down event listener on the controls div to start dragging
    // Modified to allow dragging when clicking the drag handle, controls div, or percentage
    zoomControls.addEventListener('mousedown', function(e) {
        // Start dragging if the click is on the drag handle, the controls div itself, or the percentage
        if (e.target === dragHandle || e.target === zoomControls || e.target === zoomPercentage) {
            isDragging = true;
            // Calculate the offset from the mouse pointer to the top-left corner of the controls
            const rect = zoomControls.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            zoomControls.style.cursor = 'grabbing';
            e.preventDefault(); // Prevent default drag behavior (like selecting text)
        }
    });

    // Mouse move event listener on the entire document to track dragging
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            // Update the position of the controls based on mouse movement and initial offset
            zoomControls.style.left = (e.clientX - offsetX) + 'px';
            zoomControls.style.top = (e.clientY - offsetY) + 'px';
            // Remove fixed positioning from the right/bottom if dragging
            zoomControls.style.right = 'auto';
            zoomControls.style.bottom = 'auto';
            // Remove the initial centering transform if dragging
            zoomControls.style.transform = 'none';
        }
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false; // Stop dragging
            zoomControls.style.cursor = 'grab'; // Restore cursor
        }
    });

     // Touch event listeners for dragging on touch devices
    // Modified to allow dragging when touching the drag handle, controls div, or percentage
    zoomControls.addEventListener('touchstart', function(e) {
         if (e.touches.length === 1) { // Only drag with one finger
            const touch = e.touches[0];
             // Start dragging if the touch is on the drag handle, the controls div itself, or the percentage
            if (touch.target === dragHandle || touch.target === zoomControls || touch.target === zoomPercentage) {
                 isDragging = true;
                 const rect = zoomControls.getBoundingClientRect();
                 offsetX = touch.clientX - rect.left;
                 offsetY = touch.clientY - rect.top;
                 zoomControls.style.cursor = 'grabbing';
                 e.preventDefault(); // Prevent default touch behavior (like scrolling)
            }
         }
    });

    document.addEventListener('touchmove', function(e) {
        if (isDragging && e.touches.length === 1) {
            const touch = e.touches[0];
            zoomControls.style.left = (touch.clientX - offsetX) + 'px';
            zoomControls.style.top = (touch.clientY - offsetY) + 'px';
            zoomControls.style.right = 'auto';
            zoomControls.style.bottom = 'auto';
            zoomControls.style.transform = 'none';
            e.preventDefault(); // Prevent scrolling while dragging
        }
    });

    document.addEventListener('touchend', function() {
        if (isDragging) {
            isDragging = false;
            zoomControls.style.cursor = 'grab';
        }
    });

    // --- Scroll Position Saving ---
    // Save scroll position to localStorage on scroll
    window.addEventListener('scroll', function() {
        localStorage.setItem('screenScrollY', window.scrollY);
    });
}

// Function to set up a MutationObserver to watch for the target elements and controls
function setupMutationObserver() {
    // Create an observer instance
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // Check if any of our target elements and the controls exist after DOM changes
                const targetElements = document.querySelectorAll('#screen-container, .popup');
                const zoomControls = document.querySelector('.zoom-controls');
                // We also need to make sure the drag handle exists if we rely on it for dragging
                const dragHandle = zoomControls ? zoomControls.querySelector('.drag-handle') : null;
                 // Also check for the new scroll center button
                const scrollCenterBtn = zoomControls ? zoomControls.querySelector('#scroll-center') : null;


                if (targetElements.length > 0 && zoomControls && dragHandle && scrollCenterBtn) {
                    // If target elements (at least one), controls, drag handle, and scroll center button are found, initialize and stop observing
                    initZoomController();
                    observer.disconnect(); // Stop observing once we've initialized
                }
            }
        });
    });

    // Start observing the document body for DOM changes (addition of nodes)
    observer.observe(document.body, { childList: true, subtree: true });
}

// Initial check: If the DOM is already loaded and the target/controls/handle/scroll button exist, initialize immediately.
// Otherwise, the DOMContentLoaded listener or the MutationObserver will handle initialization.
const initialTargetElements = document.querySelectorAll('#screen-container, .popup');
const initialZoomControls = document.querySelector('.zoom-controls');
const initialDragHandle = initialZoomControls ? initialZoomControls.querySelector('.drag-handle') : null;
const initialScrollCenterBtn = initialZoomControls ? initialZoomControls.querySelector('#scroll-center') : null;


if (document.readyState !== 'loading' && initialTargetElements.length > 0 && initialZoomControls && initialDragHandle && initialScrollCenterBtn) {
     initZoomController();
} else if (document.readyState !== 'loading' && (initialTargetElements.length === 0 || !initialZoomControls || !initialDragHandle || !initialScrollCenterBtn)) {
     // If DOM is ready but elements aren't there, it means they are added dynamically.
     setupMutationObserver();
}
// If document.readyState is 'loading', the DOMContentLoaded listener will handle it.