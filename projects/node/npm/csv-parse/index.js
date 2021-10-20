/**
 * @see https://csv.js.org/parse/api/callback/
 */
let csv_parse=require(`csv-parse`);
csv_parse(`
foo,bar
1,2
`.trim(),function(error,output){
    console.log(output);
});
