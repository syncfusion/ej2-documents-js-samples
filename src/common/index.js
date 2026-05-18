var cBlock = ['sb-src-code.hljs.javascript', 'sb-src-code.hljs.xml'];
var switcherPopup;
var themeSwitherPopup;
var openedPopup;
var searchPopup;
var settingsPopup;
var sidebar;
var settingsidebar;
var preventToggle;
var prevAction;
var searchInstance;
var headerThemeSwitch = document.getElementById('header-theme-switcher');
var settingElement = ej.base.select('.sb-setting-btn');
var themeList = document.getElementById('themelist');
var themeCollection = ['material3', 'bootstrap5', 'fluent2', 'tailwind3', 'fluent2-highcontrast', 'highcontrast', 'tailwind', 'fluent', 'material3-dark', 'bootstrap5-dark', 'fluent2-dark', 'tailwind-dark', 'tailwind3-dark', 'fluent-dark'];
var themesToRedirect = ['material', 'material-dark', 'bootstrap4', 'bootstrap', 'bootstrap-dark', 'fabric', 'fabric-dark'];
var darkIgnore = ['highcontrast', 'fluent2-highcontrast'];
var themeDarkButton = document.getElementById('sb-dark-theme');
var darkButton = document.getElementById('sb-dark-span');
var themeModeDropDown;
var themeDropDown;
var contentTab;
var sourceTab;
var isExternalNavigation = true;
var defaultTree = false;
var intialLoadCompleted = false;
var resizeManualTrigger = false;
var reloadPageForRedirection = false;
var leftToggle = ej.base.select('#sb-toggle-left');
var sbRightPane = ej.base.select('.sb-right-pane');
var sbContentOverlay = ej.base.select('.sb-content-overlay');
var sbBodyOverlay = ej.base.select('.sb-body-overlay');
var sbHeader = ej.base.select('#sample-header');
var resetSearch = ej.base.select('.sb-reset-icon');
var urlRegex = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development|production)*/;
var aiUrlRegex = /\/ai-[^\/]+\//;
var aiControlRegex = /^ai-.*/;
var sampleRegex = /#\/(([^\/]+\/)+[^\/\.]+)/;
// Regex for removing hidden codes
var reg = /.*custom code start([\S\s]*?)custom code end.*/g;
var sbArray = ['angular', 'nextjs', 'react', 'typescript', 'aspnetcore', 'aspnetmvc', 'vue', 'blazor'];
var sbObj = {
    'angular': 'angular',
    'nextjs': 'nextjs',
    'typescript': '',
    'react': 'react',
    'vue': 'vue',
    'blazor': 'blazor'
};
var searchEle = ej.base.select('#search-popup');
var inputele = ej.base.select('#search-input');
var searchOverlay = ej.base.select('.e-search-overlay');
var searchButton = document.getElementById('sb-trigger-search');
var setResponsiveElement = ej.base.select('.setting-responsive');
var isMobile = window.matchMedia('(max-width:550px)').matches;
var isTablet = window.matchMedia('(min-width:600px) and (max-width: 850px)').matches;
var isPc = window.matchMedia('(min-width:850px)').matches;
var selectedTheme = location.hash.split('/')[1] || getThemeDefault();
var toggleAnim = new ej.base.Animation({ duration: 500, timingFunction: 'ease' });
var controlSampleData = {};
var samplesList = getSampleList();
var samplesTreeList = [];
var execFunction = {};
var searchListView;
var sourceTabItems = [];
//window.apiList = window.apiList;
var sampleNameElement = document.querySelector('#component-name>.sb-sample-text');
var breadCrumbComponent = document.querySelector('.sb-bread-crumb-text>.category-text');
var breadCrumSeperator = ej.base.select('.category-seperator');
var breadCrumbSubCategory = document.querySelector('.sb-bread-crumb-text>.component');
var breadCrumbSample = document.querySelector('.sb-bread-crumb-text>.crumb-sample');
var hsplitter = '<div class="sb-toolbar-splitter sb-custom-item"></div>';
var openNewTemplate = "<div class=\"sb-custom-item sb-open-new-wrapper\"><a id=\"openNew\" role='tab' target=\"_blank\" aria-label=\"Open new sample\">\n<div class=\"sb-icons sb-icon-Popout\"></div></a></div>";
var sampleNavigation = "<div class=\"sb-custom-item sample-navigation\"><button id='prev-sample' role='tab' class=\"sb-navigation-prev\" \n    aria-label=\"Navigate to previous sample\">\n<span class='sb-icons sb-icon-Previous'></span>\n</button>\n<button role='tab' id='next-sample' class=\"sb-navigation-next\" aria-label=\"Navigate to next sample\">\n<span class='sb-icons sb-icon-Next'></span>\n</button>\n</div>";
var plnrTemplate = '<span class="sb-icons sb-icons-plnkr" role="presentation"></span><span class="sb-plnkr-text">Edit in StackBlitz</span>';
var contentToolbarTemplate = '<div class="sb-desktop-setting"><button id="open-plnkr" role="tab" aria-label="Open Edit in StackBlitz" tabindex="0" class="sb-custom-item sb-plnr-section">' +
    plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter +
    '</div>' + sampleNavigation + '<div class="sb-icons sb-mobile-setting"></div>';
var tabContentToolbar = ej.base.createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
var apiGridHost;
window.navigateSample = (window.navigateSample !== undefined) ? window.navigateSample : function () { return; };
var isInitRedirected;
var samplePath = [];
var defaultSamples = [];
var samplesAr = [];
var currentControlID;
var currentSampleID;
var currentControl;
var currencyDropDown;
var cultureDropDown;
var demoSection = ej.base.select('.sb-demo-section');
var newYear= new Date().getFullYear();
var copyRight= document.querySelector('.sb-footer-copyright');
copyRight.innerHTML = "Copyright © 2001 - " + newYear + " Syncfusion<sup>®</sup> Inc.";
ej.base.registerLicense('{SyncfusionJSLicensekey}');

var matchedCurrency = {
    'en': 'USD',
    'de': 'EUR',
    'ar': 'AED',
    'zh': 'CNY',
    'fr-CH': 'CHF'
};
settingsidebar = new ej.navigations.Sidebar({
    position: 'Right', width: '282', zIndex: '1003', showBackdrop: true, type: 'Over', enableGestures: false,
    closeOnDocumentClick: true, close: closeRightSidebar
});
function closeRightSidebar(args) {
  let targetEle = args.event ? args.event.target : null;
  if (targetEle && targetEle.closest('.e-popup')) args.cancel = true;
}
function changeCulture(cul) {
    if (cul === 'ar') {
        changeRtl(true);
    }
    else {
        changeRtl(false);
    }
    if (currencyDropDown) {
        currencyDropDown.value = matchedCurrency[cul];
    } else {
        ej.base.setCurrencyCode(matchedCurrency[cul]);
    }
    ej.base.setCulture(cul);
}
function changeRtl(bool) {
    var elementlist = ej.base.selectAll('.e-control', document.getElementById('control-content'));
    for (var i = 0; i < elementlist.length; i++) {
        var control = elementlist[i];
        if (control.ej2_instances) {
            for (var a = 0; a < control.ej2_instances.length; a++) {
                var instance = control.ej2_instances[a];
                instance.enableRtl = bool;
            }
        }
    }
}
function loadCulture(cul) {
    var ajax = new ej.base.Ajax('./src/common/cldr-data/main/' + cul + '/all.json', 'GET', true);
    if (ej.base.getValue('main.' + cul, ej.base.cldrData)) {
        changeCulture(cul);
    } else {
        ajax.send().then(function (result) {
            ej.base.loadCldr(JSON.parse(result));
            changeCulture(cul);
        });
    }
}

loadCulture('en');
ej.base.L10n.load(window.Locale);
isMobile = window.matchMedia('(max-width:550px)').matches;
if (ej.base.Browser.isDevice || isMobile) {
    if (sidebar) {
        sidebar.destroy();
    }
    sidebar = new ej.navigations.Sidebar({ width: '280px', showBackdrop: true, closeOnDocumentClick: true, enableGestures: false,change:resizeFunction });
    sidebar.appendTo('#left-sidebar');
} else {
    sidebar = new ej.navigations.Sidebar({
        width: '282px', target: document.querySelector('.sb-content '),
        showBackdrop: false,
        closeOnDocumentClick: false,
        enableGestures: false,
        change:resizeFunction
    });
    sidebar.appendTo('#left-sidebar');
}

if (ej.base.Browser.isDevice || isMobile) {
    leftToggle.setAttribute('aria-expanded', 'false');
} else {
    leftToggle.setAttribute('aria-expanded', 'true');
}

function resizeFunction() {
    if (!isMobile && !isTablet) {
        resizeManualTrigger = true;
        setTimeout(cusResize(), 400);
    }
}

function preventTabSwipe(e) {
    if (e.isSwiped) {
        e.cancel = true;
    }
}
function dynamicTab(e) {
    var blockEle = this.element.querySelector('#e-content' + this.tabId + '_' + e.selectedIndex).children[0];
    blockEle.innerHTML = this.items[e.selectedIndex].data;
    blockEle.innerHTML = blockEle.innerHTML.replace(reg,'');
    blockEle.classList.add('sb-src-code');
    if (blockEle) {
        hljs.highlightBlock(blockEle);
    }
}

function renderSbPopups() {
    switcherPopup = new ej.popups.Popup(document.getElementById('sb-switcher-popup'), {
        relateTo: document.querySelector('.sb-header-text-right'),
        position: { X: 'left' },
        collision: { X: 'flip', Y: 'flip' },
        offsetX: 0,
        offsetY: -15,
    });
    themeSwitherPopup = new ej.popups.Popup(document.getElementById('theme-switcher-popup'), {
        offsetY: 2,
        relateTo: document.querySelector('.theme-wrapper'),
        position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' }
    });

// Initialize AutoComplete
searchPopup = new ej.dropdowns.AutoComplete({
    dataSource: [], // Initialize with an empty data source
    filtering: function (e) {
        if (e.text && e.text.length < 3) {
            return;
        }
        let val = searchInstance.search(e.text, {
            fields: {
                component: { boost: 1 },
                name: { boost: 2 }
            },
            expand: true,
            boolean: 'AND'
        });
        val.map(function (item) {
            item['doc'] = searchInstance.documentStore.docs[item.ref];
        });
        let value = [];
        if (ej.base.Browser.isDevice) {
            for (let file of val) {
                if (file.doc.hideOnDevice !== true) {
                    value = value.concat(file);
                }
            }
        }
        let query = new ej.data.Query().take(10).select('doc');
        let fields = searchInstance.fields;
        let searchValue = ej.base.Browser.isDevice ? value : val;
        e.updateData(searchValue, query, fields);
    },
    placeholder: 'Search here...',
    noRecordsTemplate: '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>',
    fields: { groupBy: 'doc.component', value: 'doc.uid', text: 'doc.name' },
    highlight: true,
    select: function (e) {
        let data = e.itemData.doc;
        let hashval = '#/' + location.hash.split('/')[1] + '/' + data.dir + '/' + data.url + '.html';
        searchPopup.hidePopup();
        searchOverlay.classList.add('e-search-hidden');
        if (location.hash !== hashval) {
            sampleOverlay();
            location.hash = hashval;
            setSelectList();
        }
    }
}, inputele);

// Append the AutoComplete to the search element
// searchPopup.appendTo(inputele);
    settingsPopup = new ej.popups.Popup(document.getElementById('settings-popup'), {
        offsetY: 5,
        zIndex: 1001,
        relateTo: settingElement,
        position: { X: 'right', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' }
    });
    settingsidebar.appendTo('#right-sidebar');
    if (!isMobile) {
        settingsidebar.hide();
        settingsPopup.hide();
    } else {
        ej.base.select('.sb-mobile-preference').appendChild(ej.base.select('#settings-popup'));
    }
    searchPopup.hidePopup();
    switcherPopup.hide();
    themeSwitherPopup.hide();
    themeDropDown = new ej.dropdowns.DropDownList({
        index: themeCollection.indexOf(selectedTheme.split('-')[0]),
        change: function (e) { switchTheme(e.value); }
    });
    themeDropDown.appendTo('#sb-setting-theme');
    themeModeDropDown = new ej.dropdowns.DropDownList({
        index: (location.hash.split('/')[1] && location.hash.split('/')[1].includes('-dark')) ? 1 : 0,
        change: function (e) { darkSwitch() }
    });
    themeModeDropDown.appendTo('#sb-theme-mode');
    cultureDropDown = new ej.dropdowns.DropDownList({
        index: 0,
        change: function (e) {
            var value = e.value;
            loadCulture(value);
        }

    });
    currencyDropDown = new ej.dropdowns.DropDownList({
        index: 0,
        change: function (e) { ej.base.setCurrencyCode(e.value); }
    });
    cultureDropDown.appendTo('#sb-setting-culture');
    currencyDropDown.appendTo('#sb-setting-currency');
    contentTab = new ej.navigations.Tab({
        selected: changeTab,
        selecting: preventTabSwipe
    }, '#sb-content');
    sourceTab = new ej.navigations.Tab({
        items: [],
        headerPlacement: 'Bottom',
        cssClass: 'sb-source-code-section',
        selecting: preventTabSwipe,
        created: dynamicTabCreation,
        selected: dynamicTab,
    }, '#sb-source-tab');
    apiGridHost = document.getElementById('#api-grid');
    var prevbutton = new ej.buttons.Button({ iconCss: 'sb-icons sb-icon-Previous', cssClass: 'e-flat' }, '#mobile-prev-sample');
    var nextbutton = new ej.buttons.Button({ iconCss: 'sb-icons sb-icon-Next', cssClass: 'e-flat', iconPosition: 'Right' }, '#mobile-next-sample');
    var tabHeader = document.getElementById('sb-content-header');
    tabHeader.appendChild(tabContentToolbar);
    var openNew = new ej.popups.Tooltip({
        content: 'Open in New Window'
    });

    openNew.appendTo('.sb-open-new-wrapper');

    var previous = new ej.popups.Tooltip({
        content: 'Previous Sample'
    });
    previous.appendTo('#prev-sample');

    var next = new ej.popups.Tooltip({
        content: 'Next Sample'
    });

    ej.base.select('#right-pane').addEventListener('scroll', function (event) {
        next.close();
        openNew.close();
        previous.close();
    });

    next.appendTo('#next-sample');

}

function checkApiTableDataSource() {
    var hash = location.hash.split('/');
    var data = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
    if (!data.length || (isMobile || isTablet)) {
        contentTab.hideTab(2);
    } else {
        contentTab.hideTab(2, false);
    }
}

function changeTab(args) {
    if (args.selectedIndex === 2) {
        var hash = location.hash.split('/');
        var data = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
        if (!data.length) {
            var host = document.getElementById('api-grid');
            if (host) host.innerHTML = '';
        } else {
            renderApiTable(data);
        }
    }
    if (args.selectedIndex === 1) {
        sourceTab.items = sourceTabItems;
        sourceTab.refresh();
        rendercopycode();
        dynamicTabCreation(sourceTab);
    }
    if (args.selectedItem && args.selectedItem.innerText === 'DEMO') {
        let demoSection = document.getElementsByClassName('sb-demo-section')[0];
        const componentToIgnore = ['tab'];
        if (demoSection) {
            let elementList = demoSection.getElementsByClassName('e-control e-lib');
            for (let i = 0; i < elementList.length; i++) {
                let instance = elementList[i].ej2_instances;
                if (instance && instance[0] && typeof instance[0].refresh === 'function' && componentToIgnore.indexOf(instance[0].getModuleName()) === -1 && !['rich-text-editor', 'ai-assistview', 'chat-ui'].includes(currentControl)) {
                    instance[0].refresh();
                }
                if (instance && instance[0] && instance[0].getModuleName() !== 'DashboardLayout')
                    break;
            }
        }
    }
}

function dynamicTabCreation(obj) {
    var tabObj;
    if (obj) {
        tabObj = obj;
    } else { tabObj = this; }
    var contentEle = tabObj.element.querySelector('#e-content' + tabObj.tabId + '_' + tabObj.selectedItem);
    if (!contentEle) {
        return;
    }
    var blockEle = tabObj.element.querySelector('#e-content' + tabObj.tabId + '_' + tabObj.selectedItem).children[0];
    blockEle.innerHTML = tabObj.items[tabObj.selectedItem].data;
    blockEle.innerHTML = blockEle.innerHTML.replace(reg,'');
    blockEle.classList.add('sb-src-code');
    if (blockEle) {
        hljs.highlightBlock(blockEle);
    }
}

function postProcessApiTable() {
    const gridHost = document.getElementById('api-grid');
    if (!gridHost) {
        return;
    }
    const blocks = Array.from(gridHost.querySelectorAll('.sb-sample-description'));
    for (const block of blocks) {
        let inner = block.querySelector('.sb-api-content');
        if (!inner) {
            const wrap = document.createElement('div');
            wrap.className = 'sb-api-content';
            wrap.innerHTML = block.innerHTML;
            block.innerHTML = '';
            block.appendChild(wrap);
            inner = wrap;
        }
        block.classList.add('e-custDesription');
        if (block.querySelector('#showtag') || block.querySelector('#hidetag')) {
            continue;
        }
        const showTag = document.createElement('a');
        showTag.id = 'showtag';
        showTag.innerHTML = ' show more...';
        const hideTag = document.createElement('a');
        hideTag.id = 'hidetag';
        hideTag.innerHTML = ' hide less..';
        hideTag.classList.add('e-display');
        showTag.addEventListener('click', (e) => {
            e.preventDefault();
            tagShowmore(block);
        });
        hideTag.addEventListener('click', (e) => {
            e.preventDefault();
            taghideless(block);
        });
        block.appendChild(showTag);
        block.appendChild(hideTag);
        requestAnimationFrame(() => {
            const isOverflowing = inner.scrollHeight > inner.clientHeight + 2;
            if (!isOverflowing) {
                showTag.remove();
                hideTag.remove();
                block.classList.remove('e-custDesription');
            }
        });
    }
}

function renderApiTable(data) {
    if (!apiGridHost) { apiGridHost = document.getElementById('api-grid'); }
    if (!apiGridHost) { return; }
    apiGridHost.innerHTML = '';
    var grid = ej.base.createElement('div', { className: 'e-grid e-gridhover e-responsive e-default' });
    var header = ej.base.createElement('div', { className: 'e-gridheader' });
    var headerContent = ej.base.createElement('div', { className: 'e-headercontent' });
    var hTable = ej.base.createElement('table', { className: 'e-table', attrs: { role: 'grid' } });
    var hColGroup = ej.base.createElement('colgroup');
    hColGroup.appendChild(ej.base.createElement('col', { attrs: { style: 'width: 180px' } }));
    hColGroup.appendChild(ej.base.createElement('col', { attrs: { style: 'width: 180px' } }));
    hColGroup.appendChild(ej.base.createElement('col', { attrs: { style: 'width: 200px' } }));
    var thead = ej.base.createElement('thead', { className: 'e-columnheader' });
    var htr = ej.base.createElement('tr', { className: 'e-columnheader' });
    var th1 = ej.base.createElement('th', { className: 'e-headercell', attrs: { style: 'text-align: center;' } }); th1.textContent = 'Name';
    var th2 = ej.base.createElement('th', { className: 'e-headercell' }); th2.textContent = 'Type';
    var th3 = ej.base.createElement('th', { className: 'e-headercell' }); th3.textContent = 'Description';
    htr.appendChild(th1); htr.appendChild(th2); htr.appendChild(th3);
    thead.appendChild(htr);
    hTable.appendChild(hColGroup);
    hTable.appendChild(thead);
    headerContent.appendChild(hTable);
    header.appendChild(headerContent);
    var content = ej.base.createElement('div', { className: 'e-gridcontent' });
    var contentInner = ej.base.createElement('div', { className: 'e-content', attrs: { style: 'overflow-y: auto; height: auto;' } });
    var cTable = ej.base.createElement('table', { className: 'e-table', attrs: { role: 'grid' } });
    var cColGroup = hColGroup.cloneNode(true);
    var tbody = ej.base.createElement('tbody');
    var rows = data || [];
    for (var i = 0; i < rows.length; i++) {
        var r = rows[i];
        var tr = ej.base.createElement('tr', { className: 'e-row' });
        var td1 = ej.base.createElement('td', { className: 'e-rowcell e-centeralign', attrs: { 'data-col': 'name' } });
        var a = ej.base.createElement('a', { attrs: { href: r.link || '#', target: '_blank', rel: 'noopener noreferrer' } });
        a.textContent = r.name || '';
        td1.appendChild(a);
        var td2 = ej.base.createElement('td', { className: 'e-rowcell', attrs: { 'data-col': 'type' } });
        td2.textContent = r.type || '';
        var td3 = ej.base.createElement('td', { className: 'e-rowcell', attrs: { 'data-col': 'description' } });
        var descWrap = ej.base.createElement('div', { className: 'sb-sample-description' });
        var descInner = ej.base.createElement('div', { className: 'sb-api-content' });
        descInner.innerHTML = (r.description || '').toString();
        descWrap.appendChild(descInner);
        td3.appendChild(descWrap);
        tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
        tbody.appendChild(tr);
    }
    cTable.appendChild(cColGroup);
    cTable.appendChild(tbody);
    contentInner.appendChild(cTable);
    content.appendChild(contentInner);
    grid.appendChild(header);
    grid.appendChild(content);
    apiGridHost.appendChild(grid);
    tbody.addEventListener('mouseover', function (e) {
        var tr = e.target.closest('tr');
        if (tr) { tr.classList.add('e-hover'); }
    });
    tbody.addEventListener('mouseout', function (e) {
        var tr = e.target.closest('tr');
        if (tr) { tr.classList.remove('e-hover'); }
    });
    postProcessApiTable();
}

function tagShowmore(target) {
    target.classList.remove('e-custDesription');
    target.querySelector('#showtag').classList.add('e-display');
    var hideEle = target.querySelector('#hidetag');
    if (!hideEle) {
        var tag = ej.base.createElement('a', { id: 'hidetag', attrs: {}, innerHTML: 'show less..' });
        target.appendChild(tag);
        tag.addEventListener('click', taghideless.bind(this, target));
    } else {
        hideEle.classList.remove('e-display');
    }
}

function taghideless(target) {
    target.querySelector('#hidetag').classList.add('e-display');
    target.querySelector('#showtag').classList.remove('e-display');
    target.classList.add('e-custDesription');
}
function setPressedAttribute(ele) {
    var status = ele.classList.contains('active');
    ele.setAttribute('aria-pressed', status ? 'true' : 'false');
}
searchOverlay.addEventListener('click', searchOverlayClick);
function searchOverlayClick() {
    toggleSearchOverlay();
}
function sbHeaderClick(action, preventSearch) {
    if (openedPopup) {
        openedPopup.hide(new ej.base.Animation({ name: 'FadeOut', duration: 300, delay: 0 }));
    }
    if (preventSearch !== true && !searchOverlay.classList.contains('sb-hide')) {
        searchOverlay.classList.add('sb-hide');
        searchButton.classList.remove('active');
        setPressedAttribute(searchButton);
    }
    var curPopup;
    switch (action) {
        case 'changeSampleBrowser':
            curPopup = switcherPopup;
            break;
        case 'changeTheme':
            headerThemeSwitch.classList.toggle('active');
            setPressedAttribute(headerThemeSwitch);
            curPopup = themeSwitherPopup;
            break;
        case 'toggleSettings':
            settingElement.classList.toggle('active');
            setPressedAttribute(settingElement);
            themeDropDown.index = themeCollection.indexOf(selectedTheme);
            curPopup = settingsPopup;
            break;
    }
    if (action === 'closePopup') {
        headerThemeSwitch.classList.remove('active');
        settingElement.classList.remove('active');
        setPressedAttribute(headerThemeSwitch);
        setPressedAttribute(settingElement);
    }
    if (curPopup && curPopup !== openedPopup) {
        curPopup.show(new ej.base.Animation({ name: 'FadeIn', duration: 400, delay: 0 }));
        openedPopup = curPopup;
    } else {
        openedPopup = null;
    }
    prevAction = action;
}

function toggleSearchOverlay() {
    sbHeaderClick('closePopup', true);
    inputele.value = '';
    searchPopup.hidePopup();
    searchButton.classList.toggle('active');
    setPressedAttribute(searchButton);
    searchOverlay.classList.toggle('sb-hide');
    if (!searchOverlay.classList.contains('sb-hide')) {
        inputele.focus();
    }
}

function changeTheme(e) {
  var target = ej.base.closest(e.target, 'li');
  if (!target || !target.id) return;

  var themeName = target.id;

  //Switch theme via hash logic
  switchTheme(themeName);

  //Update image editor component if present
  var imageEditorElem = document.querySelector(".e-image-editor");
  if (imageEditorElem) {
    var imageEditor = ej.base.getComponent(imageEditorElem, 'image-editor');
    if (imageEditor) {
      imageEditor.theme = themeName;
    }
  }
}

function switchTheme(theme) {
  var hash = location.hash.split('/');
  var currentTheme = hash[1] || '';

  // Append -dark if current theme was dark and the new one isn't ignored
  var isDarkMode = currentTheme.includes('-dark');
  if (isDarkMode && darkIgnore.indexOf(theme) === -1 && !theme.includes('-dark')) {
    theme += '-dark';
  }

  // Avoid redundant updates
  if (currentTheme !== theme) {
    //Normalize to bootstrap5 in URL, loading handled internally as bootstrap5.3
    hash[1] = theme === 'bootstrap5.3' ? 'bootstrap5' :
              theme === 'bootstrap5.3-dark' ? 'bootstrap5-dark' :
              theme;
    location.hash = hash.join('/');
  }
}

var themeSwitched = false;
if (themeDarkButton) {
  themeDarkButton.addEventListener('click', darkSwitch);
}

function darkSwitch() {
  var hash = location.hash.split('/');
  var currentTheme = hash[1] || 'tailwind3';

  // Normalize Bootstrap alias
  var normalizedTheme = currentTheme.replace('bootstrap5.3', 'bootstrap5');
  var baseTheme = normalizedTheme.replace('-dark', '');
  var isCurrentlyDark = normalizedTheme.includes('-dark');

  // Toggle dark/light
  var newTheme = isCurrentlyDark
    ? baseTheme
    : darkIgnore.indexOf(baseTheme) === -1
      ? baseTheme + '-dark'
      : baseTheme;

  // Update hash with alias (not internal theme name)
  hash[1] = newTheme;
  location.hash = hash.join('/');
  themeSwitched = true;
}

function onsearchInputChange(e) {
    if (e.keyCode === 27 || e.keyCode === 13) {
        toggleSearchOverlay();
    }
    var searchString = e.target.value;
    if (searchString.length <= 2) {
        searchPopup.hidePopup();
        return;
    }
    var val = [];
    val = searchInstance.search(searchString, {
        fields: {
            component: { boost: 1 },
            name: { boost: 2 }
        },
        expand: true,
        boolean: 'AND'
    });
    var value = [];
    if (ej.base.Browser.isDevice) {
        for (var j = 0; j < val.length; j++) {
            if (val[j].doc.hideOnDevice !== true) {
                value = value.concat(val);
            }
        }
    }
    
}

function highlight(searchString, listElement) {
    var regex = new RegExp(searchString.split(' ').join('|'), 'gi');
    var contentElements = ej.base.selectAll('.e-list-item .e-text-content .e-list-text', listElement);
    for (var i = 0; i < contentElements.length; i++) {
        var spanText = ej.base.select('.sb-highlight', contentElements[i]);
        if (spanText) {
            contentElements[i].innerHTML = contentElements[i].text;
        }
        contentElements[i].innerHTML = contentElements[i].innerHTML.replace(regex, function (matched) {
            return '<span class="sb-highlight">' + matched + '</span>';
        });
    }
}

function setMouseOrTouch(e) {
    var ele = ej.base.closest(e.target, '.sb-responsive-items');
    var switchType = ele.id;
    changeMouseOrTouch(switchType);
    sbHeaderClick('closePopup');
    localStorage.setItem('input-mode', switchType);
    location.reload();
}

function onNextButtonClick(arg) {
    addSampleList(samplesList);
    sampleOverlay();
    var curSampleUrl = location.hash;
    var inx = samplesAr.indexOf(curSampleUrl);
    if (inx !== -1 && inx + 1 < samplesAr.length) {
        var prevhref = samplesAr[inx];
        var curhref = samplesAr[inx + 1];
        location.href = curhref;
    }
    window.hashString = location.hash;
    setSelectList();
}

function onPrevButtonClick(arg) {
    addSampleList(samplesList);
    sampleOverlay();
    var curSampleUrl = location.hash;
    var inx = samplesAr.indexOf(curSampleUrl);
    if (inx !== -1 && inx > 0) {
        var prevhref = samplesAr[inx];
        var curhref = samplesAr[inx - 1];
        location.href = curhref;
    }
    window.hashString = location.hash;
    setSelectList();
}
function addSampleList(samplesList) {
  samplesAr = [];       // Reset global sample index
  samplePath = [];      // Reset sample paths
  defaultSamples = {};  // Reset default samples map

  if (!Array.isArray(samplesList)) {
    console.warn("Invalid or undefined samplesList passed to addSampleList.");
    return;
  }

  for (var i = 0; i < samplesList.length; i++) {
    var node = samplesList[i];
    if (!node || !node.directory || !Array.isArray(node.samples) || node.samples.length === 0) {
      continue; // Skip invalid or empty entries
    }

    var control = node.directory;
    var firstSample = node.samples[0];
    defaultSamples[control] = control + '/' + firstSample.url + '.html';

    // Sort samples using ej.DataManager
    var dataManager = new ej.data.DataManager(node.samples);
    var sortedSamples = dataManager.executeLocal(new ej.data.Query().sortBy('order', 'ascending'));

    for (var j = 0; j < sortedSamples.length; j++) {
      var sample = sortedSamples[j].url;
      samplePath.push(control + '/' + sample);

      var selectedTheme = location.hash.split('/')[1] || getThemeDefault();
      var urlString = '/' + selectedTheme + '/' + control + '/' + sample + '.html';
      samplesAr.push('#' + urlString);
    }
  }
}

function processResize(e) {
    var toggle = sidebar.isOpen;

    isMobile = window.matchMedia('(max-width:550px)').matches;
    isTablet = window.matchMedia('(min-width:550px) and (max-width: 850px)').matches;
    if (isTablet) {
        resizeManualTrigger = false;
    }

    if (resizeManualTrigger || (isMobile && ej.base.select('#right-sidebar').classList.contains('sb-hide'))) {
        return;
    }
    isTablet = window.matchMedia('(min-width:550px) and (max-width: 850px)').matches;
    isPc = window.matchMedia('(min-width:850px)').matches;
    processDeviceDependables();
    setLeftPaneHeight();
    var leftPane = ej.base.select('.sb-left-pane');
    var rightPane = ej.base.select('.sb-right-pane');
    var footer = ej.base.select('.sb-footer-left');
    var pref = ej.base.select('#settings-popup');
    if (isTablet || isMobile) {
        contentTab.hideTab(2);
    } else {
        contentTab.hideTab(2, false);
    }
    if (toggle && !isPc) {
        toggleLeftPane();
    }
    if (isMobile || isTablet) {
        sidebar.target = null;
        sidebar.showBackdrop = true;
        sidebar.closeOnDocumentClick = true;
        ej.base.select('.sb-left-footer-links').appendChild(footer);

        if (isVisible('.sb-mobile-overlay')) {
            removeMobileOverlay();
        }

        if (!pref.parentElement.classList.contains('sb-mobile-preference')) {
            ej.base.select('.sb-mobile-preference').appendChild(pref);
            settingsPopup.show();
        }
        var propPanel = ej.base.select('#control-content .property-section');
        if (propPanel) {
            ej.base.select('.sb-mobile-prop-pane').appendChild(propPanel);
            ej.base.select('.sb-mobile-setting').classList.remove('sb-hide');
        }
        if (isVisible('.sb-mobile-overlay')) {
            removeMobileOverlay();
        }
    }
    if (isPc) {
        sidebar.target = document.querySelector('.sb-content ');
        sidebar.showBackdrop = false;
        sidebar.closeOnDocumentClick = false;
        ej.base.select('.sb-footer').appendChild(footer);
        if (isVisible('.sb-mobile-overlay')) {
            removeMobileOverlay();
        }

        if (isPc && !ej.base.Browser.isDevice && isVisible('.sb-left-pane')) {
            rightPane.classList.remove('control-fullview');
        }
        if (pref.parentElement.classList.contains('sb-mobile-preference')) {
            ej.base.select('#sb-popup-section').appendChild(pref);
            settingsidebar.hide();
            settingsPopup.hide();
        }
        var mobilePropPane = ej.base.select('.sb-mobile-prop-pane .property-section');
        if (mobilePropPane) {
            ej.base.select('#control-content').appendChild(mobilePropPane);
        }
        if (!ej.base.select('.sb-mobile-right-pane').classList.contains('sb-hide')) {
            toggleRightPane();
        }
    }

}

function resetInput(arg) {
    arg.preventDefault();
    arg.stopPropagation();
    document.getElementById('search-input').value = '';
    document.getElementById('search-input-wrapper').setAttribute('data-value', '');
    searchPopup.hidePopup();
}
function bindEvents() {
    document.getElementById('sb-switcher').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeSampleBrowser');
    });
    document.getElementById('sb-switcher').addEventListener('keydown', function (e) {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            sbHeaderClick('changeSampleBrowser');
        }
    });
    ej.base.select('.sb-header-text-right').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeSampleBrowser');
    });
    headerThemeSwitch.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeTheme');
    });
    headerThemeSwitch.addEventListener('keydown', function (e) {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            sbHeaderClick('changeTheme');
        }
    });
    themeList.addEventListener('click', changeTheme);
    document.addEventListener('click', sbHeaderClick.bind(this, 'closePopup'));
    settingElement.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('toggleSettings');
    });
    settingElement.addEventListener('keydown', function (e) {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            sbHeaderClick('toggleSettings');
        }
     });
    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleSearchOverlay();
    });
    searchButton.addEventListener('keydown', function (e) {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            toggleSearchOverlay();
        }
    });
    document.getElementById('settings-popup').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
    inputele.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
    inputele.addEventListener('keyup', onsearchInputChange);
    setResponsiveElement.addEventListener('click', setMouseOrTouch);
    ej.base.select('#sb-left-back').addEventListener('click', showHideControlTree);
    leftToggle.addEventListener('click', toggleLeftPane);
    leftToggle.addEventListener('keydown', (e) => {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            toggleLeftPane();
        }
    });
    ej.base.select('.sb-mobile-overlay').addEventListener('click', toggleMobileOverlay);
    ej.base.select('.sb-header-settings').addEventListener('click', viewMobilePrefPane);
    ej.base.select('.sb-mobile-setting').addEventListener('click', viewMobilePropPane);
    resetSearch.addEventListener('click', resetInput);
    document.getElementById('open-plnkr').addEventListener('click', function () {
        var plnkrForm = ej.base.select('#stack-form');
        if (plnkrForm) {
            plnkrForm.submit();
        }
    });
    document.getElementById('switch-sb').addEventListener('click', function (e) {
        var target = ej.base.closest(e.target, 'li');
        if (target) {
            var anchor = target.querySelector('a');
            if (anchor) {
                anchor.click();
            }
        }
    });
    ej.base.select('#next-sample').addEventListener('click', onNextButtonClick);
    ej.base.select('#mobile-next-sample').addEventListener('click', onNextButtonClick);
    ej.base.select('#prev-sample').addEventListener('click', onPrevButtonClick);
    ej.base.select('#mobile-prev-sample').addEventListener('click', onPrevButtonClick);
    window.addEventListener('resize', processResize);
    ej.base.select('.sb-right-pane').addEventListener('click', function () {
        if (isTablet && isLeftPaneOpen()) {
            toggleLeftPane();
        }
    });
    // ej.base.select('.copycode').addEventListener('click', copyCode);
}

function copyCode() {
    var copyElem = ej.base.select('.' + cBlock[sourceTab.selectedItem]);
    var textArea = ej.base.createElement('textArea');
    textArea.textContent = copyElem.textContent.trim();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    ej.base.detach(textArea);
    ej.base.select('.copy-tooltip').ej2_instances[0].close();
}
function rendercopycode() {
    var ele = ej.base.createElement('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
    document.getElementById('sb-source-tab').appendChild(ele);
    ej.base.select('.copycode').addEventListener('click', copyCode);
    var copiedTooltip = new ej.popups.Tooltip({ content: 'Copied to clipboard ', position: 'BottomCenter', opensOn: 'Click', closeDelay: 500 }, '.copy-tooltip');
}


function setSbLink() {
    var hrefLink = location.hash.split('/').slice(2);
    var component = hrefLink[0];
    var ej2PlatformHash = `#/${selectedTheme}/${hrefLink.join('/')}`;
    if (ej2PlatformHash.endsWith('.html')) {
        ej2PlatformHash = ej2PlatformHash.replace('.html', '');
    }
    var sdkPlatforms = { angular: 'angular', nextjs: 'nextjs',  react: 'react', vue: 'vue', typescript: 'javascript', aspnetcore: 'asp-net-core',
            aspnetmvc: 'asp-net-mvc', blazor: 'blazor-server' };
    var baseUrl = location.href.split('#')[0];
    if (baseUrl.endsWith('javascript-es5/')) {
        baseUrl = baseUrl.replace('javascript-es5/', '');
    } else {
        const components = { 'spreadsheet': 'spreadsheet-editor', 'pdf': 'pdf', 'pdfviewer': 'pdf-viewer', 'document-editor': 'docx-editor' };
        baseUrl = `https://document.syncfusion.com/demos/${components[component]}/`;
    }
    for (var i = 0, len = sbArray.length; i < len; i++) {
        var sb = sbArray[i];
        var ele = ej.base.select('#' + sb);
        var sampleUrl = `${baseUrl}${sdkPlatforms[sb]}/`;
        // Hide unsupported platform links when component is PDF
        if (component === 'pdf' && ['aspnetcore', 'angular', 'react', 'vue', 'typescript'].indexOf(sb) === -1) {
            if (ele) {
                ele.parentElement.style.display = 'none';
            }
            continue;
        }
        if (sb === 'aspnetcore') {
            sampleUrl += `${component === 'document-editor' ? 'documenteditor' : component}/default`;
            if (component === 'spreadsheet') {
                sampleUrl += 'functionalities';
            }
            else if (component === 'pdf') {
                sampleUrl='https://document.syncfusion.com/demos/javascriptpdf/default';
            }
        } else if (sb === 'aspnetmvc') {
            sampleUrl += component === 'document-editor' ? 'documenteditor' : component;
            if (component === 'pdfviewer') {
                sampleUrl += '/default';
            } else {
                sampleUrl += '/defaultfunctionalities';
            }
        } else if (sb === 'blazor') {
            if (component === 'spreadsheet') {
                sampleUrl += 'spreadsheet/overview';
            } else {
                if (component === 'pdfviewer') {
                    sampleUrl += 'pdf-viewer';
                } else {
                    sampleUrl += 'document-editor';
                }
                sampleUrl += '/default-functionalities';
            }
        } else if (sb === 'nextjs') {
            var nextjsPlatformHash = `${selectedTheme}/${hrefLink.join('/')}`;
            if (nextjsPlatformHash.endsWith('.html')) {
                nextjsPlatformHash = nextjsPlatformHash.replace('.html', '');
            }
            sampleUrl += nextjsPlatformHash;
        } else {
            sampleUrl += ej2PlatformHash;
            if (sb === 'typescript' || sb === 'vue') {
                sampleUrl += '.html';
            }
        }
        ele.href = sampleUrl;
    }
}

function changeMouseOrTouch(str) {
    var activeEle = setResponsiveElement.querySelector('.active');
    if (activeEle) {
        activeEle.classList.remove('active');
    }
    if (str === 'mouse') {
        document.body.classList.remove('e-bigger');
    } else {
        document.body.classList.add('e-bigger');
    }
    setResponsiveElement.querySelector('#' + str).classList.add('active');
}

function loadTheme(theme) {
  var body = document.body;

  // Alias conversion for Bootstrap theme
  var internalTheme = theme;
  if (theme === 'bootstrap5') internalTheme = 'bootstrap5.3';
  else if (theme === 'bootstrap5-dark') internalTheme = 'bootstrap5.3-dark';

  // Remove previous theme classes
  for (var i = 0; i < themeCollection.length; i++) {
    body.classList.remove(themeCollection[i]);
    body.classList.remove(themeCollection[i] + '-dark');
  }
  body.classList.remove('e-dark-mode');

  // Add new theme classes
  body.classList.add(internalTheme);
  if (internalTheme.includes('-dark')) {
    body.classList.add('e-dark-mode');
  }

  // Hide dark toggle if unsupported
  if (darkIgnore.indexOf(theme) !== -1) {
    if (themeDarkButton) themeDarkButton.style.display = "none";
    var mobileSwitch = document.getElementById("mobiledarkswitch");
    if (mobileSwitch) mobileSwitch.style.display = "none";
  }

  // Visual updates for theme selector
  if (!isMobile && themeList) {
    var isDark = theme.includes('-dark');
    var activeItem = themeList.querySelector('.active');
    if (activeItem) activeItem.classList.remove('active');

    var normalizedId = theme.replace('-dark', '');
    var newActive = themeList.querySelector('#' + normalizedId);
    if (newActive) newActive.classList.add('active');

    if (darkButton) darkButton.innerHTML = isDark ? "LIGHT" : "DARK";
    var darkIcon = document.getElementById("dark-icon");
    var lightIcon = document.getElementById("light-icon");
    if (darkIcon) darkIcon.style.display = isDark ? "none" : "inline-block";
    if (lightIcon) lightIcon.style.display = isDark ? "inline-block" : "none";
  }

  // Load theme CSS
  var link = document.getElementById('themelink');
  if (link) {
    link.setAttribute('href', './dist/' + internalTheme + '.css');
  }

  // Confirm theme CSS is loaded
  var ajax = new ej.base.Ajax('./dist/' + internalTheme + '.css', 'GET', true);
  ajax.send().then(function () {
    selectedTheme = theme;

    // App Initialization
    renderLeftPaneComponents();
    renderSbPopups();
    bindEvents();

    if (isTablet || isMobile) {
      contentTab.hideTab(2);
    }

    processDeviceDependables();
    addRoutes(samplesList);
    routeDefault();

    if (isTablet && isLeftPaneOpen()) {
      toggleLeftPane();
    }

    // Search Index Setup
    if (window.searchJson && typeof window.searchJson.version !== 'undefined') {
      elasticlunr.clearStopWords();
      searchInstance = elasticlunr.Index.load(window.searchJson);
    }

    // Routing Initialization
    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

    if (reloadPageForRedirection) {
      window.location.reload();
    }
  });
}
const doControls = ["chart", "three-dimension-chart", "circular-3d-chart", "stock-chart", "arc-gauge", "circular-gauge", "diagram",
    "heatmap", "linear-gauge", "maps", "range-navigator", "smith-chart", "barcode", "sparkline", "treemap", "bullet-chart", "kanban"];

// components rerendering for every dark/light toggle
function refreshSamples() {
    const currentControl = location.hash.split('/')[2];
    if (doControls.includes(currentControl)) {
        if (demo) {
            const controls = demo.getElementsByClassName('e-control e-lib');
            for (let i = 0; i < controls.length; i++) {
                const instance = controls[i].ej2_instances;
                if (instance && typeof instance[0].refresh === 'function') {
                    instance[0].refresh();
                }
            }
        }
    }
}
function changeBodyClass(darkTheme) {
  // Normalize bootstrap5 to bootstrap5.3
  if (darkTheme.includes('bootstrap5') && !darkTheme.includes('bootstrap5.3')) {
    darkTheme = darkTheme.replace('bootstrap5', 'bootstrap5.3');
  }

  // Load updated CSS file
  loadThemeLinkCss(darkTheme);

  // Replace body theme class
  if (document.body.classList.length > 1) {
    document.body.classList.replace(document.body.classList[1], darkTheme);
  } else {
    document.body.classList.add(darkTheme);
  }

  var isDark = darkTheme.includes('-dark');

  if (isDark) {
    document.body.classList.add('e-dark-mode');
    if (darkButton) darkButton.innerHTML = "LIGHT";
    var lightIcon = document.getElementById('light-icon');
    var darkIcon = document.getElementById('dark-icon');
    if (lightIcon) lightIcon.style.display = 'inline-block';
    if (darkIcon) darkIcon.style.display = 'none';
    darkTheme = darkTheme.includes('bootstrap5.3') ? 'bootstrap5-dark' : darkTheme;
  } else {
    document.body.classList.remove('e-dark-mode');
    if (darkButton) darkButton.innerHTML = "DARK";
    var lightIcon = document.getElementById('light-icon');
    var darkIcon = document.getElementById('dark-icon');
    if (lightIcon) lightIcon.style.display = 'none';
    if (darkIcon) darkIcon.style.display = 'inline-block';
    darkTheme = darkTheme.includes('bootstrap5.3') ? 'bootstrap5' : darkTheme;
  }

  // Save theme state
  selectedTheme = darkTheme;
  setThemeDefault(darkTheme);
  refreshSamples();
}

function loadThemeLinkCss(theme) {
  var linkEl = document.getElementById('themelink');
  if (linkEl) {
    linkEl.setAttribute('href', './dist/' + theme + '.css');
  }
}
function toggleMobileOverlay() {

    if (!ej.base.select('.sb-mobile-right-pane').classList.contains('sb-hide')) {
        toggleRightPane();
    }
}

function removeMobileOverlay() {
    ej.base.select('.sb-mobile-overlay').classList.add('sb-hide');
}

function isLeftPaneOpen() {
    return sidebar.isOpen;
}

function isVisible(elem) {
    return !ej.base.select(elem).classList.contains('sb-hide');
}

function setLeftPaneHeight() {
    var leftPane = ej.base.select('.sb-left-pane');
    leftPane.style.height = isMobile ? (document.body.offsetHeight + 'px') : '';
}

function toggleLeftPane() {
    var reverse = sidebar.isOpen;
    ej.base.select('#left-sidebar').classList.remove('sb-hide');
    leftToggle.setAttribute('aria-expanded', (!reverse).toString());
    if (!reverse) {
        leftToggle.classList.add('toggle-active');
    } else {
        leftToggle.classList.remove('toggle-active');
    }

    if (sidebar) {
        reverse = sidebar.isOpen;
        if (reverse) {
            sidebar.hide();
        } else {
            sidebar.show();
        }
    }

}

function cusResize() {
    var event;
    if (typeof (Event) === 'function') {
        event = new Event('resize');
    } else {
        event = document.createEvent('Event');
        event.initEvent('resize', true, true);
    }
    window.dispatchEvent(event);
}

function toggleRightPane() {
    themeDropDown.index = themeCollection.indexOf(selectedTheme);
    ej.base.select('#right-sidebar').classList.remove('sb-hide');
    if (isMobile) {
        settingsidebar.toggle();
    }
}


function viewMobilePrefPane() {
    ej.base.select('.sb-mobile-prop-pane').classList.add('sb-hide');
    ej.base.select('.sb-mobile-preference').classList.remove('sb-hide');
    toggleRightPane();
}

function viewMobilePropPane() {
    ej.base.select('.sb-mobile-preference').classList.add('sb-hide');
    ej.base.select('.sb-mobile-prop-pane').classList.remove('sb-hide');
    toggleRightPane();
}

function getSampleList() {
    if (ej.base.Browser.isDevice) {
        var tempList = ej.base.extend([], window.samplesList);
        var sampleList = [];
        for (var i = 0; i < tempList.length; i++) {
            var temp = tempList[i];
            if (temp.hideOnDevice == true) {
                continue;
            }
            var data = new ej.data.DataManager(temp.samples);
            temp.samples = data.executeLocal(new ej.data.Query().where('hideOnDevice', 'notEqual', true));
            sampleList = sampleList.concat(temp);
        }
        return sampleList;
    }
    return window.samplesList;
}

function renderLeftPaneComponents() {
    samplesTreeList = getTreeviewList(samplesList);
    var sampleTreeView = new ej.navigations.TreeView({
        fields: {
            dataSource: samplesTreeList,
            id: 'id',
            parentID: 'pid',
            text: 'name',
            hasChildren: 'hasChild',
            htmlAttributes: 'url'
        },
        nodeClicked: controlSelect,
        nodeTemplate: '<div><span class="tree-text">${name}</span>' +
            '${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">Updated</span>' +
            '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">${type}</span>${/if}${/if}</div>'
    }, '#controlTree');
    var controlList = new ej.lists.ListView({
        dataSource: controlSampleData[location.hash.split('/')[2]] || controlSampleData.grid,
        fields: { id: 'uid', text: 'name', groupBy: 'order', htmlAttributes: 'data' },
        select: controlSelect,
        template: '<div class="e-text-content ${if(type)}e-icon-wrapper${/if}"> <span class="e-list-text">${name}' +
            '</span>${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type}">Updated</span>' +
            '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type}">${type}</span>${/if}${/if}' +
            '${if(directory)}<div class="e-icons e-icon-collapsible"></div>${/if}</div>',
        groupTemplate: '${if(items[0]["category"])}<div class="e-text-content">' +
            '<span class="e-list-text">${items[0].category}</span>' +
            '</div>${/if}',
        actionComplete: setSelectList
    }, '#controlList');
}

function getTreeviewList(list) {
    var id;
    var pid;
    var tempList = [];
    var category = '';
    for (var i = 0; i < list.length; i++) {
        if (category !== list[i].category) {
            category = list[i].category;
            tempList = tempList.concat({ id: i + 1, name: list[i].category, hasChild: true, expanded: true });
            pid = i + 1;
            id = pid;
        }
        id += 1;
        tempList = tempList.concat({
            id: id,
            pid: pid,
            name: list[i].name,
            type: list[i].type,
            url: {
                'data-path': '/' + list[i].directory + '/' + list[i].samples[0].url + '.html',
                'control-name': list[i].directory,
            }
        });
        controlSampleData[list[i].directory] = getSamples(list[i].samples);
    }
    return tempList;
}

function getSamples(samples) {
    var tempSamples = [];
    for (var i = 0; i < samples.length; i++) {
        tempSamples[i] = samples[i];
        tempSamples[i].data = { 'sample-name': samples[i].url, 'data-path': '/' + samples[i].dir + '/' + samples[i].url + '.html' };
    }
    return tempSamples;
}

function controlSelect(arg) {
    var path = (arg.node || arg.item).getAttribute('data-path');
    var curHashCollection = '/' + location.hash.split('/').slice(2).join('/');
    if (path) {
        controlListRefresh(arg.node || arg.item);
        if (path !== curHashCollection) {
            sampleOverlay();
            var theme = location.hash.split('/')[1] || getThemeDefault();
            if (arg.item && ((isMobile && !ej.base.select('#left-sidebar').classList.contains('sb-hide')) ||
                ((isTablet || (ej.base.Browser.isDevice && isPc)) && isLeftPaneOpen()))) {
                toggleLeftPane();
            }
            window.hashString = '#/' + theme + path;
            setTimeout(function () { location.hash = '#/' + theme + path; }, 600);
        }
    }
}

function controlListRefresh(ele) {
    var samples = controlSampleData[ele.getAttribute('control-name')];
    if (samples) {
        var listView = ej.base.select('#controlList').ej2_instances[0];
        listView.dataSource = samples;
        showHideControlTree();
    }
}

function showHideControlTree() {
    var controlTree = ej.base.select('#controlTree');
    var controlList = ej.base.select('#controlSamples');
    var reverse = ej.base.select('#controlTree').style.display === 'none';
    if (reverse) {
        viewSwitch(controlList, controlTree, reverse);

    } else {
        viewSwitch(controlTree, controlList, reverse);
    }
}

function viewSwitch(from, to, reverse) {
    var anim = new ej.base.Animation({ duration: 500, timingFunction: 'ease' });
    var controlTree = ej.base.select('#controlTree');
    var controlList = ej.base.select('#controlList');
    controlTree.style.overflowY = 'hidden';
    controlList.classList.remove('e-view');
    controlList.classList.remove('sb-control-list-top');
    controlList.classList.add('sb-adjust-juggle');
    to.style.display = '';
    anim.animate(from, {
        name: reverse ? 'SlideRightOut' : 'SlideLeftOut',
        end: function () {
            controlTree.style.overflowY = 'auto';
            from.style.display = 'none';
            controlList.classList.add('e-view');
            controlList.classList.add('sb-control-list-top');
            controlList.classList.remove('sb-adjust-juggle');
        }
    });
    anim.animate(to, { name: reverse ? 'SlideLeftIn' : 'SlideRightIn' });
}

function setSelectList() {
    var hString = window.hashString || location.hash;
    var hash = hString.split('/');
    var list = ej.base.select('#controlList').ej2_instances[0];
    var control = ej.base.select('[control-name="' + hash[2] + '"]');
    if (control) {
        var data = list.dataSource;
        var samples = controlSampleData[control.getAttribute('control-name')];
        if (JSON.stringify(data) !== JSON.stringify(samples)) {
            list.dataSource = samples;
            list.dataBind();
        }
        var selectSample = ej.base.select('[sample-name="' + hash.slice(-1)[0].split('.html')[0] + '"]');
        if (selectSample) {
            if (ej.base.select('#controlTree').style.display !== 'none') {
                showHideControlTree();
            }
            list.selectItem(selectSample);
            selectSample.scrollIntoView({ block: "nearest" });
        }
    } else {
        showHideControlTree();
        list.selectItem(ej.base.select('[sample-name="grid-overview"]'));
    }
}

function toggleButtonState(id, state) {
    var ele = document.getElementById(id);
    var mobileEle = document.getElementById('mobile-' + id);
    ele.disabled = state;
    mobileEle.disabled = state;
    if (state) {
        mobileEle.classList.add('e-disabled');
        ele.classList.add('e-disabled');
    } else {
        mobileEle.classList.remove('e-disabled');
        ele.classList.remove('e-disabled');
    }
}

function setPropertySectionHeight() {
    if (!isTablet && !isMobile) {
        var propertypane = ej.base.select('.property-section');
        var ele = document.querySelector('.control-section');
        if (ele && propertypane) {
            ele.classList.add('sb-property-border');
        } else {
            ele.classList.remove('sb-property-border');
        }
    }
}

function routeDefault() {
    crossroads.addRoute('', function () {
        window.location.href = '#/' + selectedTheme + '/{{:component}}/{{:sample}}.html';
        isInitRedirected = true;
    });
    crossroads.bypassed.add(function (request) {
        var hash = request.split('.html')[0].split('/');
        if (samplePath.indexOf(hash.slice(1).join('/')) === -1) {
            location.hash = '#/' + hash[0] + '/' + (defaultSamples[hash[1]] || '{{:component}}/{{:sample}}.html');
            isInitRedirected = true;
            reloadPageForRedirection = true;
        }
    });
}

function destroyControls() {
    var elementlist = ej.base.selectAll('.e-control', document.getElementById('control-content'));
    for (var i = 0; i < elementlist.length; i++) {
        var control = elementlist[i];
        if (control.ej2_instances) {
            for (var a = 0; a < control.ej2_instances.length; a++) {
                var instance = control.ej2_instances[a];
                if (instance.element && document.contains(instance.element)){
                    instance.destroy();
                }
            }
        }

    }
}

function loadScriptfile(path) {
    var scriptEle = document.querySelector('script[src="' + path + '"]');
    var doFun;
    var p2 = new Promise(function (resolve, reject) {
        doFun = resolve;
    });
    if (!scriptEle) {
        scriptEle = document.createElement('script');
        scriptEle.setAttribute('type', 'text/javascript');
        scriptEle.setAttribute('src', path);
        scriptEle.onload = doFun;
        if (typeof scriptEle !== 'undefined') {
            document.getElementsByTagName('head')[0].appendChild(scriptEle);
        }
    } else {
        doFun();
    }
    return p2;
}

function getExecFunction(sample) {
    if (execFunction.hasOwnProperty(sample)) {
        return execFunction[sample];
    } else {
        execFunction[sample] = window.default;
        return execFunction[sample];
    }
}

function errorHandler(error) {
    document.getElementById('control-content').innerHTML = error ? error : 'Not Available';
    ej.base.select('#control-content').classList.add('error-content');
    removeOverlay();
}

function plunker(results) {
    var plnkr = JSON.parse(results);
    var prevForm = ej.base.select('#stack-form');
    if (prevForm) {
        ej.base.detach(prevForm);
    }
    var form = ej.base.createElement('form');
    var res = 'https://stackblitz.com/run';
    form.setAttribute('action', res);
    form.setAttribute('method', 'post');
    form.setAttribute('target', '_blank');
    form.id = 'stack-form';
    form.style.display = 'none';
    document.body.appendChild(form);
    var plunks = Object.keys(plnkr);
    for (var x = 0; x < plunks.length; x++) {
        createStackInput('project[files][' + plunks[x] + ']', plnkr[plunks[x]], form);
    }
    createStackInput('project[template]', 'javascript', form);
    createStackInput('project[description]', 'Essential JS 2 Sample', form);
    createStackInput('project[settings]', '{"compile":{"clearConsole":true}}', form);
}
function createStackInput(name, value, form) {
    var input = ej.base.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', name);
    input.setAttribute('value', value.replace(/{{theme}}/g, selectedTheme).replace(/{{ripple}}/,
        (selectedTheme.indexOf('material') !== -1 ) ? 'ej.base.enableRipple(true);\n' : ''));
    form.appendChild(input);
}

function addRoutes(samplesList) {
    var loop1 = function (node) {
        defaultSamples[node.directory] = node.directory + '/' + node.samples[0].url + '.html';
        var dataManager = new ej.data.DataManager(node.samples);
        var samples = dataManager.executeLocal(new ej.data.Query().sortBy('order', 'ascending'));
        var loop2 = function (subNode) {
            var control = node.directory;
            var sample = subNode.url;
            samplePath = samplePath.concat(control + '/' + sample);
            var sampleName = node.name + ' / ' + ((node.name !== subNode.category) ?
                (subNode.category + ' / ') : '') + subNode.name;
            var selectedTheme = location.hash.split('/')[1] ? location.hash.split('/')[1] : getThemeDefault();
            var urlString = '/' + selectedTheme + '/' + control + '/' + sample + '.html';
            samplesAr.push('#' + urlString);
            crossroads.addRoute(urlString, function () {
                var dataSourceLoad = document.getElementById(node.dataSourcePath);
                if (node.dataSourcePath && !dataSourceLoad) {
                    var dataAjax = new ej.base.Ajax(node.dataSourcePath, 'GET', true);
                    dataAjax.send().then(function (result) {
                        var ele = ej.base.createElement('script', { id: node.dataSourcePath, innerHTML: result });
                        document.getElementsByTagName('head')[0].appendChild(ele);
                        onDataSourceLoad(node, subNode, control, sample, sampleName);
                    });
                } else {
                    onDataSourceLoad(node, subNode, control, sample, sampleName);
                }


            });
        };
        for (var i = 0; i < samples.length; i++) {
            var subNode = samples[i];
            loop2(subNode);
        }
    };
    for (var i = 0; i < samplesList.length; i++) {
        var node = samplesList[i];
        loop1(node);
    }
    if (ej.base.Browser.isDevice) {
        if (location.hash && samplesAr.indexOf(location.hash) == -1) {
            var toastObj = new ej.notifications.Toast({
                position: {
                    X: 'Right'
                }
            });
            toastObj.appendTo('#sb-home');
            setTimeout(function () {
                toastObj.show({
                    content: location.hash.split('/')[2] + 'component not supported in mobile device'
                });
            }, 200);
        }
    }
}

function onDataSourceLoad(node, subNode, control, sample, sampleName) {
    var controlID = node.uid;
    var sampleID = subNode.uid;
    document.getElementById('open-plnkr').disabled = true;
    var openNew = ej.base.select('#openNew');
    if (openNew) {
        var baseHref = location.href.split('#')[0];
        const suffix = 'index.html';
        if (baseHref && baseHref.endsWith(suffix)) {  // Check if it ends with 'index.html' and remove it
            baseHref = baseHref.substring(0, baseHref.length - suffix.length);
        }
        openNew.href = baseHref + node.directory + '/' + subNode.url + '/';
    }
    setSbLink();
    const desktopSettings = ej.base.select('.sb-desktop-setting');
    if (!ej.base.Browser.isDevice && desktopSettings) {
        desktopSettings.style.display = !(/^ai-assistview/).test(control) && (aiControlRegex.test(control) || (control === 'spreadsheet' && aiControlRegex.test(sample))) ? 'none' : '';
    }
    var ajaxFile = [];
    var nameFile = [];
    var tabObj = [];
    var jsFile = new ej.base.Ajax('src/' + control + '/' + sample + '.js', 'GET', false);
    var jsname = sample + '.js';

    var htmlFile = new ej.base.Ajax('src/' + control + '/' + sample + '.html', 'GET', false);
    var htmlFileNme = sample + '.html';

    ajaxFile = [jsFile, htmlFile];
    nameFile = [jsname, htmlFileNme];
    if (subNode.sourceFiles) {
        ajaxFile.splice(0);
        nameFile.splice(0);
        var sourcefiles = subNode.sourceFiles;
        for (var i = 0; i < sourcefiles.length; i++) {
            ajaxFile.push(new ej.base.Ajax(sourcefiles[i].path, 'GET', false));
            nameFile.push(sourcefiles[i].displayName);

        }
    }
    var subfile = 0;
    var content;
    for (var file = 0; file < ajaxFile.length; file++) {

        ajaxFile[file].send().then(function (value) {  // jshint ignore:line
            var fileName = nameFile[subfile];
            if (fileName && fileName.indexOf('.html') > 0) {
                content = getStringWithOutDescription(value.toString(), /(\'|\")description/g);
                content = getStringWithOutDescription(content.toString(), /(\'|\")action-description/g);
            }
            content = fileName.indexOf('.html') > 0 ? content.replace(/@section (ActionDescription|Description){[^}]*}/g, '').replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            tabObj.push({
                header: { text: nameFile[subfile] },
                data: content,
                content: nameFile[subfile]
            });
            subfile++;
        });

    }
    sourceTabItems = tabObj;
    var ajaxHTML = new ej.base.Ajax('src/' + control + '/' + sample + '.html', 'GET', true);
    var p1 = ajaxHTML.send();
    var jsScriptName = sample;
    if ((aiControlRegex).test(control) && aiControlRegex.test(sample)) {
        jsScriptName = sample.split('ai-')[1];
    }
    var p2 = loadScriptfile('src/' + control + '/' + jsScriptName + '.js');
    var ajaxJs = new ej.base.Ajax('src/' + control + '/' + jsScriptName + '.js', 'GET', true);
    if (node.name === 'PDF') {
        sampleNameElement.innerHTML = "JavaScript PDF Library";
    } else {
       sampleNameElement.innerHTML = node.name;
    }
    contentTab.selectedItem = 0;
    breadCrumbComponent.innerHTML = node.name;
    if (node.name !== subNode.category) {
        breadCrumbSubCategory.innerHTML = subNode.category;
        breadCrumbSubCategory.style.display = '';
        breadCrumSeperator.style.display = '';
    } else {
        breadCrumbSubCategory.style.display = 'none';
        breadCrumSeperator.style.display = 'none';
    }
    breadCrumbSample.innerHTML = subNode.name;
    // for (var k = 0; k < 2; k++) {
    //     var header = getSourceTabHeader(k);
    //     if (header) {
    //         header.innerHTML = sample + (k ? '.html' : '.js');
    //     }
    // }
    var title = document.querySelector('title');
    if (control === 'pdf') {
        title.innerHTML = 'JavaScript PDF Library – Online Demos & ' + subNode.name + ' | Syncfusion';
    } else {
        title.innerHTML = node.name + ' · ' + subNode.name + ' · Syncfusion JavaScript (ES5) UI Controls ';
    }
    // ajaxJs.send().then(function (value) {
    //     document.querySelector('.js-source-content').innerHTML = value.toString().replace(/</g, '&lt;').replace(/\>/g, '&gt;');
    //     hljs.highlightBlock(document.querySelector('.js-source-content'));
    // });
    /* Canonical tag and their URL */
    if (control === 'spreadsheet' || control === 'pdfviewer' || control === 'pdf') {
        var hashParts = location.hash.split('/');
        var themeTag = hashParts[1];
        var controlTag = hashParts[2];
        var sampleTag = hashParts[3];
        const components = { 'spreadsheet': 'spreadsheet-editor', 'pdf': 'pdf', 'pdfviewer': 'pdf-viewer', 'document-editor': 'docx-editor' };
        var canonicalUrl = `https://document.syncfusion.com/demos/${components[control]}/javascript-es5/#/${themeTag}/${controlTag}/${sampleTag}`;
        var canonicalTag = document.querySelector('link[rel="canonical"]');
        if (canonicalTag) {
            canonicalTag.href = canonicalUrl;
        } else {
            canonicalTag = document.createElement('link');
            canonicalTag.rel = 'canonical';
            canonicalTag.href = canonicalUrl;
            document.head.appendChild(canonicalTag);
        }
        canonicalUrl = `https://document.syncfusion.com/demos/${components[control]}/javascript/#/${themeTag}/${controlTag}/${sampleTag}`;
        if (control === 'pdf') {
            try {
                var softwareApplication = {
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "JavaScript PDF Library",
                    "applicationCategory": "WebApplication",
                    "operatingSystem": "Any",
                    "description": "Syncfusion’s JavaScript PDF Library is a powerful, high-performance, non-UI class library. It provides seamless integration of advanced PDF functionalities into applications developed with TypeScript, JavaScript, Angular, React, Vue, ASP.NET Core, and ASP.NET MVC.",
                    "url": canonicalUrl,
                    "publisher": {
                        "@type": "Organization",
                        "name": "Syncfusion",
                        "url": "https://www.syncfusion.com"
                    }
                };

                var breadcrumbList = {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Document Solutions",
                            "item": "https://document.syncfusion.com/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "PDF",
                            "item": "https://document.syncfusion.com/demos/pdf/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "JavaScript",
                            "item": canonicalUrl
                        }
                    ]
                };

                var webPage = {
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "JavaScript PDF Library– Demo",
                    "url": canonicalUrl,
                    "description": " With Syncfusion’s JavaScript PDF Library, you can easily read, create, and manipulate PDF documents programmatically without the need of Adobe Acrobat.",
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "Syncfusion Document Solutions",
                        "url": "https://document.syncfusion.com/"
                    }
                };

                function appendJsonLd(obj, key) {
                    key = key || 'pdf';
                    var selector = 'script[type="application/ld+json"][data-jsonld="' + key + '"]';
                    var existing = document.querySelectorAll(selector);
                    existing.forEach(function (el) { el.parentNode.removeChild(el); });
                    var s = document.createElement('script');
                    s.type = 'application/ld+json';
                    s.setAttribute('data-jsonld', key);
                    s.text = JSON.stringify(obj);
                    document.head.appendChild(s);
                }

                appendJsonLd(softwareApplication, 'pdf-software');
                appendJsonLd(breadcrumbList, 'pdf-breadcrumb');
                appendJsonLd(webPage, 'pdf-webpage');
            } catch (e) {
                console && console.warn && console.warn('injectJsonLdForPdf error', e);
            }
        }
    }
    if (!((aiControlRegex).test(control) || (control === 'spreadsheet' && (aiControlRegex).test(sample))) || (/^ai-assistview/).test(control)) {
        var plunk = new ej.base.Ajax('src/' + control + '/' + sample + '-stack.json', 'GET', true);
        var p3 = plunk.send();

        p3.then(function (result) {
            document.getElementById('open-plnkr').disabled = false;
            plunker(result);
        });
    }
    Promise.all([
        p1,
        p2
    ]).then(function (results) {
        var htmlString = results[0].toString();
        destroyControls();
        currentControlID = controlID;
        currentSampleID = sampleID;
        currentControl = node.directory;
        addSampleList(samplesList);
        var curIndex = samplesAr.indexOf(location.hash);
        var samLength = samplesAr.length - 1;
        if (curIndex === samLength) {
            toggleButtonState('next-sample', true);
        } else {
            toggleButtonState('next-sample', false);
        }
        if (curIndex === 0) {
            toggleButtonState('prev-sample', true);
        } else {
            toggleButtonState('prev-sample', false);
        }
        ej.base.select('#control-content').classList.remove('error-content');
        document.getElementById('control-content').innerHTML = htmlString;
        var controlEle = document.querySelector('.control-section');
        var controlString = controlEle.innerHTML;
        controlEle.innerHTML = '';
        controlEle.appendChild(ej.base.createElement('div', { className: 'control-wrapper', innerHTML: controlString }));
        renderPropertyPane('#property');
        renderDescription();
        renderActionDescription();
        var htmlCode = ej.base.createElement('div', { innerHTML: htmlString });
        var description = htmlCode.querySelector('#description');
        if (description) {
            ej.base.detach(description);
        }
        var actionDesc = htmlCode.querySelector('#action-description');
        if (actionDesc) {
            ej.base.detach(actionDesc);
        }
        // var htmlCodeSnippet = htmlCode.innerHTML.replace(/&/g, '&amp;')
        //     .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        // document.querySelector('.html-source-content').innerHTML = htmlCodeSnippet;
        // hljs.highlightBlock(document.querySelector('.html-source-content'));
        getExecFunction(control + sample)();
        window.navigateSample();
        isExternalNavigation = defaultTree = false;
        checkApiTableDataSource();
        setPropertySectionHeight();
        removeOverlay();
        var mobilePropPane = ej.base.select('.sb-mobile-prop-pane .property-section');
        if (mobilePropPane) {
            ej.base.detach(mobilePropPane);
        }
        var propPanel = ej.base.select('#control-content .property-section');
        if (isMobile) {
            if (propPanel) {
                ej.base.select('.sb-mobile-setting').classList.remove('sb-hide');
                ej.base.select('.sb-mobile-prop-pane').appendChild(propPanel);
            } else {
                ej.base.select('.sb-mobile-setting').classList.add('sb-hide');
            }
        }
    }).catch(function (reason) {
        errorHandler(reason.message);
    });
}

function removeOverlay() {
    document.body.setAttribute('aria-busy', 'false');
    sbContentOverlay.classList.add('sb-hide');
    sbRightPane.classList.remove('sb-right-pane-overlay');
    sbHeader.classList.remove('sb-right-pane-overlay');
    mobNavOverlay(false);
    if (!sbBodyOverlay.classList.contains('sb-hide')) {
        sbBodyOverlay.classList.add('sb-hide');
    }
    if (!isMobile) {
        sbRightPane.scrollTop = 0;
    } else {
        sbRightPane.scrollTop = 74;
    }
    if (cultureDropDown.value == "ar") {
        changeRtl(true);
    }

}

function sampleOverlay() {
    document.body.setAttribute('aria-busy', 'true');
    sbHeader.classList.add('sb-right-pane-overlay');
    sbRightPane.classList.add('sb-right-pane-overlay');
    mobNavOverlay(true);
    sbContentOverlay.classList.remove('sb-hide');
}

function overlay() {
    sbHeader.classList.add('sb-right-pane-overlay');
    sbBodyOverlay.classList.remove('sb-hide');
}

function mobNavOverlay(isOverlay) {
    if (ej.base.isDevice) {
        var mobileFoorter = ej.base.select('.sb-mobilefooter');
        if (isOverlay) {
            mobileFoorter.classList.add('sb-right-pane-overlay');
        } else {
            mobileFoorter.classList.remove('sb-right-pane-overlay');
        }
    }
}

function checkSampleLength(directory) {
    var data = new ej.data.DataManager(samplesList);
    var controls = data.executeLocal(new ej.data.Query().where('directory', 'equal', directory));
    return controls[0].samples.length > 1;
}
function setThemeDefault(theme) {
  localStorage.setItem('previousTheme', theme);
}
function getThemeDefault() {
  var previousTheme = localStorage.getItem('previousTheme') || 'tailwind3';
  return previousTheme;
}
function parseHash(newHash, oldHash) {
  const parts = newHash.split('/');
  const rawTheme = parts[0] || 'tailwind3';
  const control = parts[1] || '';
  const sampleName = parts[2] || '';

  // Normalize theme for hash (alias form)
  const resolveAlias = (theme) => {
    return theme === 'bootstrap5.3' ? 'bootstrap5' :
           theme === 'bootstrap5.3-dark' ? 'bootstrap5-dark' : theme;
  };

  const displayNewTheme = resolveAlias(rawTheme);
  const displayOldTheme = resolveAlias(selectedTheme || 'tailwind3');
  const baseNewTheme = displayNewTheme.replace('-dark', '');
  const baseOldTheme = displayOldTheme.replace('-dark', '');

  const componentsToAddRoutes = [
    "Chart", "3D Chart", "3D Circular Chart", "Stock Chart", "Arc Gauge",
    "Circular Gauge", "Diagram", "HeatMap Chart", "Linear Gauge", "Maps",
    "Range Selector", "Smith Chart", "Barcode", "Sparkline Charts",
    "TreeMap", "Bullet Chart"
  ];

  // Reload only if base theme has changed
  if (baseNewTheme !== baseOldTheme && themeCollection.includes(displayNewTheme)) {
    setThemeDefault(displayNewTheme);
    location.reload();
    return;
  }

  // Theme variant switched without base change
  if (
    baseNewTheme === baseOldTheme &&
    displayNewTheme !== displayOldTheme &&
    themeCollection.includes(displayNewTheme)
  ) {
    changeBodyClass(displayNewTheme);

    const isComplexComponent = componentsToAddRoutes.some(function (item) {
      return item.toLowerCase() === control.toLowerCase();
    });

    if (isComplexComponent) {
      addRoutes(samplesList);
    } else {
      addSampleList(samplesList);
      return;
    }
  } else {
    addRoutes(samplesList);
  }

  // Re-route for complex controls
  if (
    componentsToAddRoutes.some(function (item) {
      return item.toLowerCase() === control.toLowerCase();
    })
  ) {
    addRoutes(samplesList);
  }

  // Initialize global routing config
  window.samplesJSON = window.samplesJSON || {};
  samplesJSON.skipCommonChunk = window.sampleSkip || [];
    /* if (newHash.length && !ej.base.select('#' + control + '-common') && checkSampleLength(control)) {
         var scriptElement = document.createElement('script');
         scriptElement.src = 'src/' + control + '/common.js';
         scriptElement.id = control + '-common';
         scriptElement.type = 'text/javascript';
         scriptElement.onload = function () {
             crossroads.parse(newHash);
         };
         document.getElementsByTagName('head')[0].appendChild(scriptElement);
     }*/

    crossroads.parse(newHash);
}

// function getSourceTabHeader(index) {
//     return document.querySelectorAll('.sb-source-code-section>.e-tab-header .e-tab-text')[index];
// }

function processDeviceDependables() {
    if (ej.base.Browser.isDevice) {
        ej.base.select('.sb-desktop-setting').classList.add('sb-hide');
    } else {
        ej.base.select('.sb-desktop-setting').classList.remove('sb-hide');
    }
}

function checkTabHideStatus() {
    if (!intialLoadCompleted) {
        content.hideTab(1);
        intialLoadCompleted = true;
    }
}

function renderPropertyPane(ele) {
    var contentEle = ej.base.select('#control-content');
    var elem = contentEle.querySelector(ele);
    var title;
    if (!elem) {
        return;
    }
    title = elem.getAttribute('title');
    var parentEle = elem.parentElement;
    elem = ej.base.detach(elem);
    elem.classList.add('property-panel-table');
    var parentPane = ej.base.createElement('div', {
        className: 'property-panel-section',
        innerHTML: "<div class=\"property-panel-header\">" + title + "</div><div class=\"property-panel-content\"></div>"
    });
    parentPane.children[1].appendChild(elem);
    parentEle.appendChild(parentPane);
}

function renderDescription() {
    var header;
    var description = ej.base.select('#description', ej.base.select('#control-content'));
    var descElement = ej.base.select('.description-section');
    var iDescription = ej.base.select('#description', descElement);
    if (iDescription) {
        ej.base.detach(iDescription);
    }
    if (description) {
        descElement.appendChild(description);
    }
}

function renderActionDescription() {
    var aDescription = ej.base.select('#action-description', ej.base.select('#control-content'));
    var aDescElem = ej.base.select('.sb-action-description');
    if (aDescription) {
        aDescElem.innerHTML = '';
        aDescElem.appendChild(aDescription);
        aDescElem.style.display = '';
    } else if (aDescElem) {
        aDescElem.style.display = 'none';
    }
    var loadEle = document.getElementById('sb-content');
     if (loadEle.ej2_instances[0])
        loadEle.ej2_instances[0].tbObj.refreshOverflow();
}
function getStringWithOutDescription(code, descRegex) {
    var lines = code.split('\n');
    var desStartLine = null;
    var desEndLine = null;
    var desInsideDivCnt = 0;
    for (var i = 0; i < lines.length; i++) {
        var curLine = lines[i];
        if (desStartLine) {
            if (/<div/g.test(curLine)) {
                desInsideDivCnt = desInsideDivCnt + 1;
            }
            if (desInsideDivCnt && /<\/div>/g.test(curLine)) {
                desInsideDivCnt = desInsideDivCnt - 1;
            } else if (!desEndLine && /<\/div>/g.test(curLine)) {
                desEndLine = i + 1;
            }
        }
        if (descRegex.test(curLine)) {
            desStartLine = i;
        }
    }
    if (desEndLine && desStartLine) {
        lines.splice(desStartLine, desEndLine - desStartLine);
    }
    return lines.join('\n');
}

function loadJSON() {
    var switchText = localStorage.getItem('input-mode') || 'mouse';
    if (ej.base.Browser.isDevice || window.screen.width <= 850) {
        switchText = 'touch';
    }
    setLeftPaneHeight();
    if (isMobile) {
        ej.base.select('#left-sidebar').classList.add('sb-hide');
        ej.base.select('.sb-left-footer-links').appendChild(ej.base.select('.sb-footer-left'));
        leftToggle.classList.remove('toggle-active');
    }
    /**
     * Tab View
     */
    if (isTablet || (ej.base.Browser.isDevice && isPc)) {
        leftToggle.classList.remove('toggle-active');
        ej.base.select('.sb-right-pane').classList.add('control-fullview');
    }

    if (isTablet || ej.base.Browser.isDevice) {
        ej.base.select('.sb-responsive-section').classList.add('sb-active');
    }

    overlay();
    changeMouseOrTouch(switchText);
    localStorage.removeItem('ej2-switch');
     // Fix: Get theme from localStorage and update URL if needed
    var storedTheme = getThemeDefault();
    var currentHash = location.hash;
    
    if (currentHash) {
        var hashParts = currentHash.split('/');
        var urlTheme = hashParts[1];
        
        // If URL theme differs from stored theme, update URL
        if (urlTheme !== storedTheme) {
            hashParts[1] = storedTheme;
            var newHash = hashParts.join('/');
            // Update URL without triggering hash change event yet
            history.replaceState(null, null, newHash);
            selectedTheme = storedTheme;
        }
    } else {
        // No hash present, set default with stored theme
        var defaultHash = '#/' + storedTheme + '/{{:component}}/{{:sample}}.html';
        history.replaceState(null, null, defaultHash);
        selectedTheme = storedTheme;
    }
    ej.base.enableRipple(selectedTheme.indexOf('material') !== -1 || !selectedTheme);
    loadTheme(selectedTheme);
}
loadJSON();
