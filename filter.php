<?php // This file is part of Moodle - http://moodle.org/
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

/**
 * This filter adds mathslate editors over textbox inputs
 *
 * @package    filter_mathslate
 * @copyright  2015 Daniel Thies (dthies@ccal.edu)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Filter for Mathslate
 */
class filter_mathslate extends moodle_text_filter {

    /*
     * This function wraps the filtered text in a span, that mathjaxloader is configured to process.
     *
     * @param string $text The text to filter.
     * @param array $options The filter options.
     */
    public function filter($text, array $options = array()) {
        if (!strpos($text, 'MATHSLATE')) {
            return $text;
        }
        global $CFG, $PAGE;
        static $jsinitialised = false;
        
        if (!$jsinitialised) {
            $jsinitialised = true;
            $url = $CFG->wwwroot . '/filter/mathslate/plugins';
            $helpurl = $CFG->wwwroot . '/lib/editor/tinymce/plugins/mathslate/help.php';

            $PAGE->requires->strings_for_js(array( 'nomathjax', 'clear', 'undo', 'redo', 'help'), 'tinymce_mathslate');
            $PAGE->requires->strings_for_js(array( 'mathslate', 'cancel', 'cancel_desc',
                'inline', 'display', 'inline_desc', 'display_desc', 'nomathjax',
                'clear', 'undo', 'redo'), 'tinymce_mathslate');

            $PAGE->requires->yui_module('moodle-filter_mathslate-loader',
                'M.filter_mathslate.initialiser', 
                 array(array('configurl' => $url,
                             'helpurl' => $helpurl)));
        }
            $text = preg_replace('/\\{MATHSLATE:(.*?)\\}/', '<span class="nolink"><script type="text/x-mathslate-config">$1</script></span>', $text);
        return $text;
    }
}
