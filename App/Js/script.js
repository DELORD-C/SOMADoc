let darkMode = document.getElementById('darkmode');
if (darkMode) {
    darkMode.addEventListener('change', () => {
        if (darkMode.checked) {
            document.body.setAttribute('theme', 'bright')
        } else {
            document.body.removeAttribute('theme')
        }
    });
}

let md = document.querySelector('md');
if (md) {
    md.innerHTML = marked.parse(md.innerHTML.replace(/&gt;+/g, '>'), { sanitize: true });

    let titles = document.querySelectorAll('md h2, md h3');

    let h2Opened = false;
    let h2Title = '';
    let pageNav = document.createElement('div');
    pageNav.classList.add('page-nav')
    let html = `<div class="nav"><p class='small text-center'>Sur cette page</p><ul class="nopad">`;
    let regex = /[^A-z0-9]/g

    for (let title of titles) {
        if (title.tagName === 'H2') {
            h2Title = 'pagenav-2-'+title.innerHTML.replaceAll(regex,'');
            title.setAttribute('id', h2Title)
            if (h2Opened) {
                html = html + `</ul></li>`;
            }
            h2Opened = true;
            html = html + `<li><a href='#`+h2Title+`'>`+title.innerHTML+`</a><ul>`;
        }
        if (title.tagName === 'H3') {
            let h3Title = 'pagenav-3-' + title.innerHTML.replaceAll(regex,'');
            title.setAttribute('id', h3Title)
            html = html + `<li><a href='#`+h3Title+`'>`+title.innerHTML+`</a></li>`
        }
    }

    html = html + `</ul></li></ul></div>`;
    pageNav.innerHTML = html;
    md.after(pageNav)

    document.querySelectorAll('.page-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });

    document.addEventListener('scroll', () => {
        updatePageNav();
    })
    updatePageNav();

    let navCheckbox = document.getElementById("navCheckbox");
    if (navCheckbox) {
        navCheckbox.addEventListener('change', () => {
            let checked = navCheckbox.checked
            let nav = document.querySelector('.doc > .nav');
            console.log(checked)
            if (nav) {
                if (checked) {
                    nav.style.left = '0';
                    document.body.style.height = '100vh';
                    document.body.style.overflowY ='hidden';
                } else {
                    nav.style.left = '-100%';
                    document.body.style.height = 'unset';
                    document.body.style.overflowY ='scroll';
                }
            }
        })
    }
}

function updatePageNav () {
    let doc = document.documentElement;
    let top = doc.scrollTop;
    if (top === 0) {
        for (let link of document.querySelectorAll('.page-nav a[href^="#"]')) {
            link.classList.remove('active');
        }
        document.querySelector('.page-nav > div > ul > li:first-child a').classList.add('active');
    } else if (top === doc.offsetHeight - window.innerHeight) {
        for (let link of document.querySelectorAll('.page-nav a[href^="#"]')) {
            link.classList.remove('active');
        }
        document.querySelector('.page-nav > div > ul > li:last-child a').classList.add('active');
    } else {
        for (let heading of document.querySelectorAll('md h2, md h3')) {
            let rect = heading.getBoundingClientRect()
            if (
                rect.top >= (window.innerHeight || document.documentElement.clientHeight) * 0.3 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 1.3
            ) {
                for (let link of document.querySelectorAll('.page-nav a[href^="#"]')) {
                    if (link.getAttribute('href') === '#' + heading.getAttribute('id')) {
                        link.classList.add('active')
                        if (
                            link.offsetTop < document.querySelector('.page-nav .nav').scrollTop + link.offsetHeight
                        ) {
                            document.querySelector('.page-nav .nav').scrollTo({
                                top: link.offsetTop - document.querySelector('.page-nav .nav').offsetHeight*0.2,
                                behavior: "smooth"
                            });
                        } else if (link.offsetTop > document.querySelector('.page-nav .nav').scrollTop + document.querySelector('.page-nav .nav').offsetHeight - link.offsetHeight) {
                            document.querySelector('.page-nav .nav').scrollTo({
                                top: link.offsetTop + document.querySelector('.page-nav .nav').offsetHeight*0.2,
                                behavior: "smooth"
                            });
                        }
                    } else {
                        link.classList.remove('active')
                    }
                }
                break;
            }
        }
    }
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
        document.body.style.height = 'unset';
        document.body.style.overflowY ='scroll';
        if (document.querySelector('.doc > .nav')) {
            document.querySelector('.doc > .nav').style.left = '0';
        }
        if (document.getElementById("navCheckbox")) {
            document.getElementById("navCheckbox").checked = false;
        }
    } else {
        if (document.querySelector('.doc > .nav')) {
            document.querySelector('.doc > .nav').style.left = '-100%';
        }
    }
})

let versionSelect = document.getElementById('version');
if (versionSelect) {
    versionSelect.addEventListener('change', () => {
        console.log(window.location.href)
        let params = window.location.href.split('/').reverse()
        console.log(params)
        params[2] = versionSelect.value
        window.location.href = params.reverse().join('/')
    })
}

let flashes = document.getElementById('flashes');
if (flashes) {
    flashes.style.right = '10px';
    setTimeout(() => {
        flashes.style.right = '-300px';
        setTimeout(() => {
            flashes.remove();
        }, 300);
    }, 5000);
}

if (data) {
    data = JSON.parse(data);
    let search = document.querySelector('#search > input');
    if (search) {
        search.addEventListener('keyup', () => {
            if (search.value.length > 2) {
                getSuggestions(data, search.value);
            } else {
                hideSuggest(0)
            }
        })
        search.addEventListener('focus', () => {
            if (search.value.length > 2) {
                getSuggestions(data, search.value);
            } else {
                hideSuggest(0)
            }
        })
        search.addEventListener('keydown', (e) => {
            console.log(e)
        })
        document.addEventListener('click', (e) => {
            if( document.getElementById('suggestions') && e.target !== search && e.target !== document.getElementById('suggestions') && !document.getElementById('suggestions').contains(e.target)) {
                hideSuggest()
            }
        })
    }
}

function getSuggestions(data, str) {
    let suggest = document.getElementById("suggestions");

    if (suggest) {
        let results = [];
        Object.keys(data).forEach(folder => {
            Object.keys(data[folder]).forEach(file => {
                for (let line in data[folder][file]) {
                    if (data[folder][file][line].content.toLowerCase().includes(str.toLowerCase())) {
                        results.push(data[folder][file][line])
                    }
                }
            })
        })

        let html = '';
        if (results.length > 0) {
            for (let result of results) {
                html = html + `<li><a href="`+result.link+`"><p>`+result.content.replaceAll('#', '').trim()+`</p><p class="small">`+result.path+`</p></a></li>`;
            }
        } else {
            html = '<li><p>...</p></li>'
        }
        suggest.innerHTML = html;
        suggest.style.opacity = '1';
        suggest.style.pointerEvents = 'all';
    }
}

function hideSuggest(duration = 300) {
    let suggest = document.getElementById("suggestions");
    if (suggest) {
        suggest.style.opacity = '0';
        suggest.style.pointerEvents = 'none';
        setTimeout(() => {
            suggest.innerHTML = '';
        }, duration)
    }
}

let loading = document.getElementById('loading');
if (loading) {
    loading.style.opacity = '0';
    loading.style.pointerEvents = 'none';

    window.addEventListener('beforeunload', () => {
        loading.style.opacity = '1';
        loading.style.pointerEvents = 'all';
    })
}