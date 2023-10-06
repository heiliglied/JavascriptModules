
function infiniteScroll(watch: HTMLElement, target: string, callback: Function) {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.intersectionRatio > 0) {
                const lists = new Promise((resolve, reject) => {
                    resolve(callback());
                });

                lists.then((response) => {
                    if (response != null) {
                        let targetElement = document.querySelector(target) ?? null;
                        if(targetElement != null) {
                            targetElement.insertAdjacentHTML('beforeend', <string>response);
                        }
                        observer.unobserve(entry.target);
                        observer.observe(watch);
                    } else {
                        observer.unobserve(entry.target);
                    }
                });
            }
        });
    });
    observer.observe(watch);
}