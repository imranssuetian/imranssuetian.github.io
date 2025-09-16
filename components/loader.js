// Component Loader Utility
class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading component:', error);
        }
    }

    static async loadHeader(isMainPage = false) {
        const headerPath = isMainPage 
            ? './components/header-main.html' 
            : '../components/header.html';
        await this.loadComponent('header-placeholder', headerPath);
    }

    static async loadFooter(isMainPage = false) {
        const footerPath = isMainPage 
            ? './components/footer.html' 
            : '../components/footer.html';
        await this.loadComponent('footer-placeholder', footerPath);
    }

    static async initComponents(isMainPage = false) {
        await Promise.all([
            this.loadHeader(isMainPage),
            this.loadFooter(isMainPage)
        ]);
        
        // Re-initialize any JavaScript that depends on the loaded components
        if (typeof initializeNavigation === 'function') {
            initializeNavigation();
        }
    }
}

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const isMainPage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname === '/' ||
                      window.location.pathname.endsWith('/');
    
    ComponentLoader.initComponents(isMainPage);
});