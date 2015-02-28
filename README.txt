filter_mathslate
=================

Mathslate is a graphical tool for constructing mathematics within
Moodle. This plugin adds the tool to various question types of
other imputs.  Install the tinymce_mathslate plugin and install this
directory as a subdirectory of the Moodle directory filter with the name
mathslate. Then visit the administrators notification page to install
the plugin to the database and adjust the settings.

This plugin requires MathJax to run. If MathJax is configured on the
Moodle site either within theme or using MathJaxloader, Mathslate is
able to use it.  For more information about MathJax see mathjax.org.
If MathJaxloader filter is used, visit the MathJaxloader settings page and
add MATHSLATE to the additional delimiters box. Go to the 'Manage filters'
settings and set the Mathslate filter to 'On' or 'Off, but available'.

To use in a quiz question include a specification of the form
{MATHSLATE:type=default,format=tex} before a short answer type response
while editing a question. This works with question type, short answer,
cloze and STACK.  Alternate configuration files can be created in
the plugins directory to allow for different editor configurations and
mathematical formats.  To use other configurations change the parameters
while editing the question.

All original files are copyright Daniel Thies dthies@ccal.edu 2013
onwards and are licensed under the included GPL 3.
