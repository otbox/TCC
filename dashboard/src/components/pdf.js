import html2pdf from 'html2pdf.js';

export function pdf(element, opt) {
    html2pdf().from(element).set(opt).save();
}