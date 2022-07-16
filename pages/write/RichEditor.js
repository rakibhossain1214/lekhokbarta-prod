import React from 'react'
import CKEditor from 'react-ckeditor-component'

let config = {
  toolbarGroups: [
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    {
      name: 'editing',
      groups: ['find', 'selection', 'spellchecker', 'editing'],
    },
    { name: 'forms', groups: ['forms'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    {
      name: 'paragraph',
      groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'],
    },
    '/',
    { name: 'links', groups: ['links'] },
    { name: 'insert', groups: ['insert'] },
    { name: 'styles', groups: ['styles'] },
    { name: 'colors', groups: ['colors'] },
    { name: 'tools', groups: ['tools'] },
    '/',
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'others', groups: ['others'] },
    { name: 'about', groups: ['about'] },
  ],
  removeButtons:
    // 'Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Replace,Form,Checkbox,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,SpecialChar,PageBreak,Iframe,Anchor,ShowBlocks,About,CopyFormatting,Undo,Redo',
    'Save,NewPage,Print,Templates,Find,Scayt,Replace,Form,Checkbox,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,SpecialChar,PageBreak,Anchor,ShowBlocks,About,CopyFormatting,Source',

  fontSize_sizes: '16/16px;24/24px;48/48px;',
  font_names:
    'Arial/Arial, Helvetica, sans-serif;' +
    'Times New Roman/Times New Roman, Times, serif;' +
    'Verdana',
  allowedContent: true,
  // disableNativeSpellChecker: false
  // skin: "moono",
  // plugins:
  //   "dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,copyformatting,div,resize,elementspath,enterkey,entities,popup,filetools,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc"
}

// config = {
//   customConfig: "config.js",
//   autoUpdateElement: true,
//   language: "",
//   defaultLanguage: "en",
//   contentsLangDirection: "",
//   enterMode: 1,
//   forceEnterMode: false,
//   shiftEnterMode: 2,
//   docType: "<!DOCTYPE html>",
//   bodyId: "",
//   bodyClass: "",
//   fullPage: false,
//   height: 200,
//   extraPlugins: "",
//   removePlugins: "",
//   protectedSource: [],
//   tabIndex: 0,
//   width: "",
//   baseFloatZIndex: 10000,
//   blockedKeystrokes: [1114178, 1114185, 1114197],
//   startupMode: "wysiwyg",
//   coreStyles_bold: { element: "strong", overrides: "b" },
//   coreStyles_italic: { element: "em", overrides: "i" },
//   coreStyles_underline: { element: "u" },
//   coreStyles_strike: { element: "s", overrides: "strike" },
//   coreStyles_subscript: { element: "sub" },
//   coreStyles_superscript: { element: "sup" },
//   colorButton_colors:
//     "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF",
//   colorButton_foreStyle: {
//     element: "span",
//     styles: { color: "#(color)" },
//     overrides: [{ element: "font", attributes: { color: null } }]
//   },
//   colorButton_backStyle: {
//     element: "span",
//     styles: { "background-color": "#(color)" }
//   },
//   // templates_files: [
//   //   "file:///Users/rambabus/workspace/EC/dbspweb_sg/common/dbsweb_formbuilder/authoring/web/sg/dbs_custom/Formbuilder/2.0/ng-ckeditor-master/libs/ckeditor/plugins/templates/templates/default.js?t=E7KD"
//   // ],
//   templates_replaceContent: true,
//   menu_groups:
//     "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",
//   toolbarLocation: "top",
//   basicEntities: true,
//   entities: true,
//   entities_latin: true,
//   entities_greek: true,
//   entities_additional: "#39",
//   find_highlight: {
//     element: "span",
//     styles: { "background-color": "#004", color: "#fff" }
//   },
//   flashEmbedTagOnly: false,
//   flashAddEmbedTag: true,
//   flashConvertOnEdit: false,
//   font_names:
//     "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif",
//   font_defaultLabel: "",
//   font_style: {
//     element: "span",
//     styles: { "font-family": "#(family)" },
//     overrides: [{ element: "font", attributes: { face: null } }]
//   },
//   fontSize_sizes:
//     "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px",
//   fontSize_defaultLabel: "",
//   fontSize_style: {
//     element: "span",
//     styles: { "font-size": "#(size)" },
//     overrides: [{ element: "font", attributes: { size: null } }]
//   },
//   format_tags: "p;h1;h2;h3;h4;h5;h6;pre;address;div",
//   format_p: { element: "p" },
//   format_div: { element: "div" },
//   format_pre: { element: "pre" },
//   format_address: { element: "address" },
//   format_h1: { element: "h1" },
//   format_h2: { element: "h2" },
//   format_h3: { element: "h3" },
//   format_h4: { element: "h4" },
//   format_h5: { element: "h5" },
//   format_h6: { element: "h6" },
//   disableObjectResizing: false,
//   disableNativeTableHandles: true,
//   disableNativeSpellChecker: true,
//   // contentsCss:
//   //   "file:///Users/rambabus/workspace/EC/dbspweb_sg/common/dbsweb_formbuilder/authoring/web/sg/dbs_custom/Formbuilder/2.0/ng-ckeditor-master/libs/ckeditor/contents.css?t=E7KD",
//   image_removeLinkByEmptyURL: true,
//   smiley_images: [
//     "regular_smile.png",
//     "sad_smile.png",
//     "wink_smile.png",
//     "teeth_smile.png",
//     "confused_smile.png",
//     "tongue_smile.png",
//     "embarrassed_smile.png",
//     "omg_smile.png",
//     "whatchutalkingabout_smile.png",
//     "angry_smile.png",
//     "angel_smile.png",
//     "shades_smile.png",
//     "devil_smile.png",
//     "cry_smile.png",
//     "lightbulb.png",
//     "thumbs_down.png",
//     "thumbs_up.png",
//     "heart.png",
//     "broken_heart.png",
//     "kiss.png",
//     "envelope.png"
//   ],
//   smiley_descriptions: [
//     "smiley",
//     "sad",
//     "wink",
//     "laugh",
//     "frown",
//     "cheeky",
//     "blush",
//     "surprise",
//     "indecision",
//     "angry",
//     "angel",
//     "cool",
//     "devil",
//     "crying",
//     "enlightened",
//     "no",
//     "yes",
//     "heart",
//     "broken heart",
//     "kiss",
//     "mail"
//   ],
//   linkShowAdvancedTab: true,
//   linkShowTargetTab: true,
//   magicline_keystrokePrevious: 3342387,
//   magicline_keystrokeNext: 3342388,
//   removeFormatTags: "",
//   removeFormatAttributes: "",
//   // removeFormatTags:
//   //   "b,big,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var",
//   // removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign",
//   specialChars: [
//     "!",
//     "&quot;",
//     "#",
//     "$",
//     "%",
//     "&amp;",
//     "'",
//     "(",
//     ")",
//     "*",
//     "+",
//     "-",
//     ".",
//     "/",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     ":",
//     ";",
//     "&lt;",
//     "=",
//     "&gt;",
//     "?",
//     "@",
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//     "[",
//     "]",
//     "^",
//     "_",
//     "`",
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//     "{",
//     "|",
//     "}",
//     "~",
//     "&euro;",
//     "&lsquo;",
//     "&rsquo;",
//     "&ldquo;",
//     "&rdquo;",
//     "&ndash;",
//     "&mdash;",
//     "&iexcl;",
//     "&cent;",
//     "&pound;",
//     "&curren;",
//     "&yen;",
//     "&brvbar;",
//     "&sect;",
//     "&uml;",
//     "&copy;",
//     "&ordf;",
//     "&laquo;",
//     "&not;",
//     "&reg;",
//     "&macr;",
//     "&deg;",
//     "&sup2;",
//     "&sup3;",
//     "&acute;",
//     "&micro;",
//     "&para;",
//     "&middot;",
//     "&cedil;",
//     "&sup1;",
//     "&ordm;",
//     "&raquo;",
//     "&frac14;",
//     "&frac12;",
//     "&frac34;",
//     "&iquest;",
//     "&Agrave;",
//     "&Aacute;",
//     "&Acirc;",
//     "&Atilde;",
//     "&Auml;",
//     "&Aring;",
//     "&AElig;",
//     "&Ccedil;",
//     "&Egrave;",
//     "&Eacute;",
//     "&Ecirc;",
//     "&Euml;",
//     "&Igrave;",
//     "&Iacute;",
//     "&Icirc;",
//     "&Iuml;",
//     "&ETH;",
//     "&Ntilde;",
//     "&Ograve;",
//     "&Oacute;",
//     "&Ocirc;",
//     "&Otilde;",
//     "&Ouml;",
//     "&times;",
//     "&Oslash;",
//     "&Ugrave;",
//     "&Uacute;",
//     "&Ucirc;",
//     "&Uuml;",
//     "&Yacute;",
//     "&THORN;",
//     "&szlig;",
//     "&agrave;",
//     "&aacute;",
//     "&acirc;",
//     "&atilde;",
//     "&auml;",
//     "&aring;",
//     "&aelig;",
//     "&ccedil;",
//     "&egrave;",
//     "&eacute;",
//     "&ecirc;",
//     "&euml;",
//     "&igrave;",
//     "&iacute;",
//     "&icirc;",
//     "&iuml;",
//     "&eth;",
//     "&ntilde;",
//     "&ograve;",
//     "&oacute;",
//     "&ocirc;",
//     "&otilde;",
//     "&ouml;",
//     "&divide;",
//     "&oslash;",
//     "&ugrave;",
//     "&uacute;",
//     "&ucirc;",
//     "&uuml;",
//     "&yacute;",
//     "&thorn;",
//     "&yuml;",
//     "&OElig;",
//     "&oelig;",
//     "&#372;",
//     "&#374",
//     "&#373",
//     "&#375;",
//     "&sbquo;",
//     "&#8219;",
//     "&bdquo;",
//     "&hellip;",
//     "&trade;",
//     "&#9658;",
//     "&bull;",
//     "&rarr;",
//     "&rArr;",
//     "&hArr;",
//     "&diams;",
//     "&asymp;"
//   ],
//   wsc_removeGlobalVariable: true,
//   // plugins:
//   //   "dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,div,resize,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,undo,wsc",
//   // skin: "moono",
//   scayt_handleCheckDirty: true,
//   scayt_handleUndoRedo: true,
//   wsc_cmd: "spell",
//   wsc_version: "4.4.4 | %Rev%"
// };

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.blur = this.onBlur.bind(this)
    this.afterPaste = this.afterPaste.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = {
      html: this.props.html,
    }
  }

  onChange(evt) {
    // console.log("onChange fired with event info: ", evt);
    var html = evt.editor.getData()
    console.log('this', this)
    this.setState({ html })
  }

  onBlur(evt) {
    console.log('onBlur event called with event info: ', evt)
  }

  afterPaste(evt) {
    console.log('afterPaste event called with event info: ', evt)
  }

  render() {
    return (
      <CKEditor
        activeClass="p10"
        config={config}
        content={this.state.html}
        // onChange={this.onChange}
        events={{
          blur: this.onBlur,
          afterPaste: this.afterPaste,
          change: this.onChange,
        }}
      />
    )
  }
}

export default Example