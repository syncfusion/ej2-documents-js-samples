require("@syncfusion/ej2-documents-sample-helper");

var fs = global.fs = global.fs || require('fs');
var glob = global.glob = global.glob || require('glob');
var gulp = global.gulp = global.gulp || require("gulp");
var shelljs = global.shelljs = global.shelljs || require('shelljs');
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';

var cssTemplate = `.sb-bread-crumb-text {
  font-size: 22px;
  padding-left: 20px;
  padding-top: 24px;
  /* padding-bottom: 10px; */
  margin: 0;
}`;

gulp.task('SEO-changes', function (done) {
    var newWindowSamples = glob.sync('./samples/**/**/index.html');
    var samplsListJson = JSON.parse(fs.readFileSync('./sampleOrder.json'));

    for (var i = 0; i < newWindowSamples.length; i++) {
        var isCssFile = fs.existsSync(newWindowSamples[i].replace(`.html`, `.css`));
        if (isCssFile) {
            var cssFile = fs.readFileSync(newWindowSamples[i].replace(`.html`, `.css`), 'utf8');
            cssFile = cssFile.replace(/.sb-bread-crumb h2[^}]+\}/g, '').replace(/.sb-bread-crumb h1[^}]+\}/g, '');
            cssFile += cssTemplate;
            fs.writeFileSync(newWindowSamples[i].replace(`.html`, `.css`), cssFile, 'utf8');
        }

        var indexFile = fs.readFileSync(newWindowSamples[i], 'utf8');
        var parts = newWindowSamples[i].split("/");
        var desiredPart = `${parts[2]}/${parts[3]}/${parts[4]}`;
        var canon = `<link rel="canonical" href="https://ej2.syncfusion.com/demos/${desiredPart}">`;
        if (samplsListJson[newWindowSamples[i].split('/')[2]] === undefined) {
            console.log(`${i}------${newWindowSamples[i]}`);
        }
        var ControlName = samplsListJson[newWindowSamples[i].split('/')[2]].ControlName;
        var sampleName = samplsListJson[newWindowSamples[i].split('/')[2]].Samples[newWindowSamples[i].split('/')[3]];
        if (sampleName === undefined) {
            sampleName = (newWindowSamples[i].split('/')[3]).replace(/(^|-)([a-z])/g, (_, separator, letter) => (separator ? ' ' : '') + letter.toUpperCase()).trim();
        }
        indexFile = indexFile.replace(/<meta name="description"(.*)/g, '');
        var headerDesc = '';
        var h1Regex = /<h1 class="sb-bread-crumb-text">/g;
        var h2Regex = /<h2 class="sb-bread-crumb-text">/g;

        if (h1Regex.test(indexFile) && h2Regex.test(indexFile)) {
            indexFile = indexFile.replace(/<h1 class="sb-bread-crumb-text">([\s\S]*?)<\/h1>/g, '');
            if (newWindowSamples[i].indexOf('sidebar') >= 0) {
                headerDesc = '';
            } else {
                headerDesc = `<h1 class="sb-bread-crumb-text">Example of ${sampleName} in Javascript ${ControlName} Control</h1>`;
            }
            indexFile = indexFile.replace(/<h2 class=/g, `${headerDesc}\n<h2 class=`);
        } else {
            if (!(newWindowSamples[i].indexOf('sidebar') >= 0)) {
                headerDesc = `<h1 class="sb-bread-crumb-text">Example of ${sampleName} in Javascript ${ControlName} Control</h1>`;
            }
            indexFile = indexFile.replace('</h1>', '</h2>').replace(/<h1 class=/g, `${headerDesc}\n<h2 class=`);
        }
        var metaTagTemplate = `<meta name="description" content="This example demonstrates the ${sampleName} functionality within the Javascript ${ControlName} Control. Explore here for more details." />`;
        indexFile = indexFile.replace(/<title>(.*)/g, '<title>' + 'Javascript ' + ControlName + ' ' + sampleName + ' Example - Syncfusion Demos</title>\n\t' + metaTagTemplate);
        indexFile = indexFile.replace(/<head>/, `<head>
        <script>function _0xde02(){var _0x5f2ba3=['9TYJyPJ','8519130vccODC','length','indexOf','642676nYqdEN','split','1588446jBtanR','1207348wihLFo','204856gJKXOd','1996386mrrBRO','7202905WqbCdL','href','ej2.syncfusion.com','36VGEwVI'];_0xde02=function(){return _0x5f2ba3;};return _0xde02();}var _0x5c03ce=_0x2e99;(function(_0x4610ba,_0x2edf38){var _0x2bab05=_0x2e99,_0x295339=_0x4610ba();while(!![]){try{var _0x258b1a=parseInt(_0x2bab05(0xd5))/0x1+-parseInt(_0x2bab05(0xd7))/0x2+parseInt(_0x2bab05(0xd1))/0x3*(parseInt(_0x2bab05(0xd8))/0x4)+-parseInt(_0x2bab05(0xdb))/0x5+parseInt(_0x2bab05(0xd2))/0x6+parseInt(_0x2bab05(0xda))/0x7+-parseInt(_0x2bab05(0xd9))/0x8*(parseInt(_0x2bab05(0xd0))/0x9);if(_0x258b1a===_0x2edf38)break;else _0x295339['push'](_0x295339['shift']());}catch(_0x5cb54d){_0x295339['push'](_0x295339['shift']());}}}(_0xde02,0xdfa28));var bypassKey=[0x73,0x79,0x6e,0x63,0x66,0x75,0x73,0x69,0x6f,0x6e,0x2e,0x69,0x73,0x4c,0x69,0x63,0x56,0x61,0x6c,0x69,0x64,0x61,0x74,0x65,0x64];function _0x2e99(_0x50a339,_0x56f268){var _0xde0271=_0xde02();return _0x2e99=function(_0x2e9975,_0x55ee02){_0x2e9975=_0x2e9975-0xce;var _0x32119=_0xde0271[_0x2e9975];return _0x32119;},_0x2e99(_0x50a339,_0x56f268);}function convertToChar(_0x3e5688){var _0x37d95d=_0x2e99,_0x30ade7='';for(var _0x30d200=0x0,_0x532558=_0x3e5688;_0x30d200<_0x532558[_0x37d95d(0xd3)];_0x30d200++){var _0xc98512=_0x532558[_0x30d200];_0x30ade7+=String['fromCharCode'](_0xc98512);}return _0x30ade7;}location[_0x5c03ce(0xce)]&&location['href'][_0x5c03ce(0xd4)](_0x5c03ce(0xcf))!==-0x1&&(window[convertToChar(bypassKey)['split']('.')[0x0]]={},window[convertToChar(bypassKey)[_0x5c03ce(0xd6)]('.')[0x0]][convertToChar(bypassKey)[_0x5c03ce(0xd6)]('.')[0x1]]=!![]);</script>`);
        indexFile = indexFile.replace('</head>',canon +"\n</head>")
        fs.writeFileSync(newWindowSamples[i], indexFile.replace('Essential JS 2','Essential Studio'), 'utf8');
    }
    done();
}
);
  
gulp.task('create-sampleList', function (done) {
    var sampleJsonFiles = glob.sync('./src/**/sample.json');
    var temp = `"{{folderpath}}": {
        "ControlName": "{{controlname}}",
        "Samples": {
            {{samplesList}}
        }
    }`;
    var pathTemp = `{{path}}:{{name}}`
    for (var i = 0; i < sampleJsonFiles.length; i++) {
        var sampleFile = JSON.parse(fs.readFileSync(sampleJsonFiles[i]));
        var sampleJson = temp.replace(`{{folderpath}}`, sampleFile.directory).replace(`{{controlname}}`, sampleFile.name);
        var samplesList = '';
        for (var j = 0; j < sampleFile.samples.length; j++) {
            var template = pathTemp;
            template = template.replace(`{{path}}`, `"${sampleFile.samples[j].url}"`).replace(`{{name}}`, `"${sampleFile.samples[j].name}"`);
            samplesList += template + `,\n`;
        }
        sampleJson = sampleJson.replace(`{{samplesList}}`, samplesList);
        console.log(i + `----------` + sampleJsonFiles[i].replace(`/sample.json`, '').replace(`./src/`, ''));
        fs.writeFileSync(sampleJsonFiles[i].replace(`sample.json`, 'sample'), sampleJson, 'utf8');
    }

    // Constructing samplOrder.json file
    console.log(`Constructing samplOrder.json file`);
    var sampleTemp = glob.sync('./src/**/sample');
    var jsonString = '';
    for (var i = 0; i < sampleTemp.length; i++) {
        var indexFile = fs.readFileSync(sampleTemp[i], 'utf8');
        jsonString += indexFile + ',\n';
    }
    fs.writeFileSync('./sampleOrder.json', '{\n' + jsonString + '\n}', 'utf8');
    done();
}
);

/* jshint ignore:start */
// Task to hide the license banner in the base library files
gulp.task('hide-license-sdk', function (done) {
    try {
        let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
        console.log('Platform : ' + config.platform);
        let isValid = true;
        if (config.platform === 'javascript') {
            let filePath = require.resolve('@syncfusion/ej2/dist/ej2.min.js');
            let filecheck = fs.existsSync(filePath);
            console.log('ej2.min.js file exists:  ' + filecheck);
            if (filecheck) {
                let pattern = '(this.isLicensed=!0,null):this.errors.componentRestricted';
                replaceStringInFile(require.resolve('@syncfusion/ej2/dist/ej2.min.js'), pattern, '(this.isLicensed=!0,null):null');
                isValid = false;
            }
        }
        if (isValid) {
            let patternArray = ['return this.errors.componentRestricted'];
            let pathArray = [
                require.resolve('@syncfusion/ej2-base/dist/ej2-base.umd.min.js'),
                require.resolve('@syncfusion/ej2-base/dist/es6/ej2-base.es5.js'),
                require.resolve('@syncfusion/ej2-base/dist/es6/ej2-base.es2015.js'),
                require.resolve('@syncfusion/ej2-base/src/validate-lic.js')
            ];

            for (let i in pathArray) { replaceStringInFile(pathArray[i], patternArray[0], 'return null'); }
        }

    } catch (error) { if (error) console.log('Gulp task to hide license ', error); }
    done();
});
/**
 * Replace the first occurence of the pattern in the inputFile
 * @param {string} filePath - Input file path
 * @param {string} pattern - String pattern that to be replaced in inputFile
 * @param {string} replaceString - String that need to replace inputFile
 */
function replaceStringInFile(filePath, pattern, replaceString) {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            console.log('Pattern match found: ' + data.includes(pattern));
            if (data && pattern && replaceString && data.includes(pattern)) {
                let replacedata = data.replace(pattern, replaceString);
                console.log('Is data replaced: ' + (!replacedata.includes(pattern)));
                fs.writeFileSync(filePath, data.replace(pattern, replaceString), 'utf8');
            }
        }
    } catch (error) { if (error) console.log('replaceStringInFile function: ', error); }
}
exports.replaceStringInFile = replaceStringInFile;

const componentMapping = {
    'EJ2_PDF_SDK': 'pdfviewer',
    'EJ2_EXCEL_SDK': 'spreadsheet',
    'EJ2_DOCUMENT_SDK': 'document-editor',
    'EJ2_PDF_LIBRARY': 'pdf'
};

const componentDisplayNames = {
    'pdfviewer': 'PDF Viewer SDK',
    'spreadsheet': 'Spreadsheet Editor SDK',
    'document-editor': 'DOCX Editor SDK',
    'pdf': 'PDF Library'
};

const defaultSamples = {
    'pdfviewer': 'default',
    'spreadsheet': 'default',
    'document-editor': 'default',
    'pdf': 'default'
};

gulp.task('document-build', function(done) {
    Object.keys(componentMapping).forEach(targetDir => {
        shelljs.cd(targetDir);
        console.log('Entered into path: ', process.cwd());
        shelljs.exec('npm run build');
        const componentName = componentMapping[targetDir];
        const indexHtmlPath = `./index.html`;
        if (fs.existsSync(indexHtmlPath)) {
            let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
            const value = componentDisplayNames[componentName];
            htmlContent = htmlContent.replace(
                /(<span class='sb-header-text-left'>Essential Studio<sup>®<\/sup>)( for)(<\/span>)/,
                `$1 ${value}$2$3`
            );

            fs.writeFileSync(indexHtmlPath, htmlContent, 'utf8');
            console.log(`Updated span with component name in ${indexHtmlPath}`);
        } else {
            console.log(`Warning: index.html not found at ${indexHtmlPath}`);
        }
        
        shelljs.cd('../');
    })
    done();
});

gulp.task('document-split', function(done) {

    // Define sampleOrder structure for each component
    const sampleOrderMapping = {
        'spreadsheet': {
            "Grids": ["Spreadsheet"]
        },
        'pdfviewer': {
            "File Viewers & Editors": ["PDF Viewer"]
        },
        'document-editor': {
            "File Viewers & Editors": ["Word Processor"]
        },
        'pdf': {
            "Document Processing Library": ["PDF"]
        },
    };

    Object.keys(componentMapping).forEach(targetDir => {
        if (!fs.existsSync(targetDir)) {
            shelljs.mkdir('-p', targetDir);
        }
        
        const componentName = componentMapping[targetDir];
        
        shelljs.ls('-A', '.').forEach(item => {
            if (!Object.keys(componentMapping).includes(item) && item !== 'node_modules' && item !== 'package-lock.json') {
                if (fs.existsSync(item)) {
                    shelljs.cp('-r', item, `${targetDir}/`);
                }
            }
        });
        if (fs.existsSync(`${targetDir}/samples`)) {
            shelljs.ls(`${targetDir}/samples`).forEach(folder => {
                if (folder !== componentName && fs.statSync(`${targetDir}/samples/${folder}`).isDirectory()) {
                    shelljs.rm('-rf', `${targetDir}/samples/${folder}`);
                }
            });
        }
        
        if (fs.existsSync(`${targetDir}/src`)) {
            shelljs.ls(`${targetDir}/src`).forEach(folder => {
                if (folder !== componentName &&  folder !== 'common' && folder !== 'images' && fs.statSync(`${targetDir}/src/${folder}`).isDirectory()) {
                    shelljs.rm('-rf', `${targetDir}/src/${folder}`);
                }
            });
        }

        // Create component-specific sampleOrder.json
        const sampleOrderPath = `${targetDir}/src/common/sampleOrder.json`;
        const sampleOrderContent = sampleOrderMapping[componentName];
        if (sampleOrderContent) {
            // Ensure the common directory exists
            if (!fs.existsSync(`${targetDir}/src/common`)) {
                shelljs.mkdir('-p', `${targetDir}/src/common`);
            }
            // Write the component-specific sampleOrder.json
            fs.writeFileSync(sampleOrderPath, JSON.stringify(sampleOrderContent, null, 2), 'utf8');
            console.log(`Created sampleOrder.json for ${componentName} at ${sampleOrderPath}`);
        } else {
            console.log(`Warning: No sampleOrder mapping found for component: ${componentName}`);
        }
        const indexJsPath = `${targetDir}/src/common/index.js`;
        if (fs.existsSync(indexJsPath)) {
            let indexContent = fs.readFileSync(indexJsPath, 'utf8');
            indexContent = indexContent.replace(/\{\{:component\}\}/g, componentName)
                            .replace(/\{\{:sample\}\}/g, defaultSamples[componentName]);
            fs.writeFileSync(indexJsPath, indexContent, 'utf8');
            console.log(`Updated routing in ${indexJsPath}`);
        } else {
            console.log(`Warning: index.ts not found at ${indexJsPath}`);
        }
        
        shelljs.cd(targetDir);
        console.log('Entered into path: ', process.cwd());
        shelljs.exec('npm install');
        shelljs.cd('../');
    });
    

    done();
});

/**
 * Task for publishing Document SDK samples to S3
 */
const componentMappingLink = {
    'EJ2_PDF_SDK': 'pdfviewer-editor',
    'EJ2_EXCEL_SDK': 'spreadsheet-editor',
    'EJ2_DOCUMENT_SDK': 'document-editor',
    'EJ2_PDF_LIBRARY': 'pdf'
};
gulp.task('publish-document-samples', function (done) {
    var cdn = require('./node_modules/@syncfusion/ej2-documents-sample-helper/src/publish/cdn.js');
    var commonfile = require('./node_modules/@syncfusion/ej2-documents-sample-helper/src/utils/common.js');
    // Validate branch type
    const isValidBranch = /^(release\/|hotfix\/).+|^development$/.test(process.env.githubSourceBranch);
    if (!isValidBranch) {
        console.log('Skipping publishing. Branch is not development, hotfix, or release');
        return done();
    }
    var gzip = require('gulp-gzip');
    
    // SDK folders to publish
    var sdkFolders = ['EJ2_PDF_SDK', 'EJ2_DOCUMENT_SDK', 'EJ2_EXCEL_SDK', 'EJ2_PDF_LIBRARY'];
    var processedFolders = 0;
    // Set basePath based on branch type
    let basePath = `./js/development/demos`;
    if (/^(hotfix\/|release\/)/.test(process.env.githubSourceBranch)) {
        const branchName = process.env.githubSourceBranch.split(/hotfix\/|release\//)[1];
        basePath = `./js/hotfix/${branchName}/demos`;
    }
    // Process each SDK folder
    sdkFolders.forEach(function(folder) {
        // Create destination path
        var destPath = basePath + '/' + componentMappingLink[folder];
        shelljs.mkdir('-p', destPath);
        
        console.log('Publishing ' + folder + ' to ' + destPath);
        
        // Files to publish - everything in the SDK folder
        var filesToPublish = [
            './' + folder + '/**/*',
            '!./' + folder + '/node_modules/**',
            '!./' + folder + '/.git/**'
        ];
        
        // Use gulp to compress and publish
        gulp.src(filesToPublish, { base: './' + folder, dot: true })
            .pipe(gzip({ append: false }))
            .pipe(gulp.dest(destPath))
            .on('end', function() {
                var prefixName = destPath.split('./')[1];
                
                // Use cdn.publish to upload to S3
                cdn.publish(destPath, false, prefixName, function() {
                    processedFolders++;
                    console.log(folder + ' publishing complete.');
                    
                    // When all folders are processed, mark the task as done
                    if (processedFolders === sdkFolders.length) {
                        console.log('All SDK folders published successfully.');
                        done();
                    }
                });
            })
            .on('error', function(error) {
                console.error('Error publishing ' + folder + ':', error);
                done(error);
            });
    });
});