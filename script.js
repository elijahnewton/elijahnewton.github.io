(() => {
    // Cache DOM elements
    const sidebar = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('menu-overlay');

    // --- 1. Sidebar Toggle Logic ---
    window.toggleMenu = function() {
        if (!sidebar || !overlay) return;

        if (sidebar.classList.contains('sidebar-closed')) {
            // Open
            sidebar.classList.remove('sidebar-closed');
            sidebar.classList.add('sidebar-open');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);
            // Create icons when menu is opened
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                lucide.createIcons();
            }
        } else {
            // Close
            sidebar.classList.remove('sidebar-open');
            sidebar.classList.add('sidebar-closed');
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
    };

    // --- 2. Highlight Active Page Link ---
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize Lucide Icons
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            lucide.createIcons();
        }

        // Get current path (e.g., "/services.html" or just "/")
        const currentPath = window.location.pathname.split("/").pop() || 'index.html';

        // Find all navigation links
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            // Get the href attribute (e.g., "services.html")
            const linkPath = link.getAttribute('href');

            // Check if this link matches the current page
            if (linkPath === currentPath) {
                // Add active styling (Blue text + light blue background)
                link.classList.add('text-blue-900', 'bg-blue-50', 'font-bold');
                link.classList.remove('text-gray-700');
            }
        });
    });
})();

function submitForm() {
    const name = document.getElementById('name').value;
    alert('Webale! ' + name + ' We have received your message.');
   
return false;
}