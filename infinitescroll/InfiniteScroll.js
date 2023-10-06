function infiniteScroll(watch, target, callback) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0) {
                var lists = new Promise(function (resolve, reject) {
                    resolve(callback());
                });
                lists.then(function (response) {
                    var _a;
                    if (response != null) {
                        var targetElement = (_a = document.querySelector(target)) !== null && _a !== void 0 ? _a : null;
                        if (targetElement != null) {
                            targetElement.insertAdjacentHTML('beforeend', response);
                        }
                        observer.unobserve(entry.target);
                        observer.observe(watch);
                    }
                    else {
                        observer.unobserve(entry.target);
                    }
                });
            }
        });
    });
    observer.observe(watch);
}