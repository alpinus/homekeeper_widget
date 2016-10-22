var express = require('express');
var router = express.Router();
var printer = require("printer");
var ipp = require('ipp');  
var util = require('util');
var PDFDocument = require ('pdfkit');
var fs = require('fs'),
//doc = new PDFDocument();
router.post("/print",function(req,res){
	var txt=req.body.text;
	var doc = new PDFDocument({margin:0});  
	doc.text(txt, 0, 780);  
	console.log(txt+"打印内容");
	/*var txtdata = fs.readFileSync(doc);
	//打印支持的格式console.log("supported formats are:\n"+util.inspect(printer.getSupportedPrintFormats(), {colors:true, depth:10}));
	printer.printDirect({data:txtdata// or simple String: "some text"
	//, printer:'Foxit Reader PDF Printer' // printer name, if missing then will print to default printer
	, type: 'PDF' // type: RAW, TEXT, PDF, JPEG, .. depends on platform
	, success:function(jobID){
		console.log("sent to printer with ID: "+jobID);
	}
	, error:function(err){console.log(err);}
	});*/
	doc.output(function(pdf){  
    var printer = ipp.Printer("//192.168.1.123/printer");  
    var msg = {  
        "operation-attributes-tag": {  
            "requesting-user-name": "William",  
            "job-name": "My Test Job",  
            "document-format": "application/pdf"  
        },  
        data: pdf  
    };  
    printer.execute("Print-Job", msg, function(err, res){  
        console.log(res);  
    });  
});  
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;