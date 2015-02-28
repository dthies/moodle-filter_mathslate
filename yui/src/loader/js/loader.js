// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    filter_mathslate
 * @copyright  2014 Daniel Thies <dthies@ccal.edu>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-filter_mathslate-loader
 */

/**
 * Mathslate filter plugin.
 *
 * @namespace M.filter_mathslate
 * @class button
 * @extends M.editor_filter.EditorPlugin
 */

var CSS = {EDITOR: 'mathslate-filter'};

M.filter_mathslate = M.filter_mathslate || {
    initialiser: function(params) {
        M.tinymce_mathslate = M.tinymce_mathslate || {};
        M.tinymce_mathslate.help = params.helpurl;

        var format, texInput, type;

        window.setTimeout(function() {
            var list = Y.all('script[type="text/x-mathslate-config"], input, textarea');
            Y.all('script[type="text/x-mathslate-config"]').each(function(script) {
                var editorID = Y.guid();
                var input = list.item(list.indexOf(script) + 1);
                if (!input.test('input, textarea')) {
                    return;
                }
                var editor = Y.Node.create('<div id="' +
                    editorID +
                    '" class="filter-mathslate-editor" />');
                input.ancestor().insertBefore(editor, input);
                if (input.getAttribute('value') !== '' || input.test('[readonly="readonly"]')) {
                    return;
                }
                if (/type *=/.test(script.get('text'))) {
                    type = script.get('text')
                        .replace(/.*?type *= *([a-z]*).*/, '$1');
                } else {
                    type = 'default';
                }
                texInput = (script.get('text').replace(/.*?texInput *= *([a-z]*).*/, '$1') === "true");
                if (/format *=/.test(script.get('text'))) {
                    format = script.get('text')
                        .replace(/.*?format *= *([a-z]*).*/, '$1');
                } else {
                    format = 'tex';
                }
                var ddeditor = new M.tinymce_mathslate.Editor(
                    '#' + editorID,
                    params.configurl + '/' + type +'/config.json',
                    {texInput: texInput}
                );
                // Update the input element if the workspace is rendered.
                window.MathJax.Hub.Register.MessageHook("New Math",function () {
                    if (!ddeditor || !ddeditor.output) {
                        return;
                    }
                    input.getDOMNode().value = ddeditor.output(format);
                });
                editor.addClass(CSS.EDITOR);
                editor.addClass(CSS.EDITOR + '-' + type);
            });
        },(typeof window.MathJax === 'undefined') ? 500 : 0);

    },
    ATTRS: {
        /**
         * The url of the configuration file for mathematics templates
         *
         * @attribute configurl
         * @type string
         */
        configurl: {
            value: null
        },
        /**
         * The url of the help file
         *
         * @attribute helpurl
         * @type string
         */
        helpurl: {
            value: null
        },
        /**
         * The url of the icon to open editor
         *
         * @attribute iconurl
         * @type string
         */
        iconurl: {
            value: null
        }
    }
};
