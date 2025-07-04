let canUpdate = true;
let darkmode = document.getElementById('darkmode');
if (darkmode) {
    darkmode.addEventListener('change', () => {
        if (darkmode.checked) {
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
            h2Title = 'pagenav-'+title.innerHTML.replaceAll(' ','-').replaceAll(regex,'');
            title.setAttribute('id', h2Title)
            if (h2Opened) {
                html = html + `</ul></li>`;
            }
            h2Opened = true;
            html = html + `<li><a href='#`+h2Title+`'>`+title.innerHTML+`</a><ul>`;
        }
        if (title.tagName === 'H3') {
            let h3Title = h2Title + '-' + title.innerHTML.replaceAll(' ','-').replaceAll(regex,'');
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
            canUpdate = false;

            for (let link of document.querySelectorAll('.page-nav a[href^="#"]')) {
                link.classList.remove('active')
            }

            this.classList.add('active');

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            setTimeout(() => {
                canUpdate = true;
            }, 800)
        });
    });

    document.addEventListener('scroll', (e) => {
        updatePageNav();
    })
    updatePageNav();

    let navCheckbox = document.getElementById("navCheckbox");
    if (navCheckbox) {
        navCheckbox.addEventListener('change', (e) => {
            let checked = navCheckbox.checked
            let nav = document.querySelector('.doc > .nav');
            console.log(checked)
            if (nav) {
                if (checked) {
                    nav.style.left = 0;
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
    if (canUpdate) {
        for (let heading of document.querySelectorAll('md h2, md h3')) {
            let rect = heading.getBoundingClientRect()
            if (
                rect.top >= 0 + (window.innerHeight || document.documentElement.clientHeight) * 0.3 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 1.3
            ) {
                for (let link of document.querySelectorAll('.page-nav a[href^="#"]')) {
                    if (link.getAttribute('href') == '#' + heading.getAttribute('id')) {
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
            document.querySelector('.doc > .nav').style.left = '-100%';
        }
        if (document.getElementById("navCheckbox")) {
            document.getElementById("navCheckbox").checked = false;
        }
    }
})