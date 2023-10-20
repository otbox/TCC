import html2pdf from 'html2pdf.js';
import { historico } from '../pages/EstufaView';
import { Button } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';

interface pdfProps {
    data: historico[];
    nomeEstufa?: string;
}

export default function downloadPdfButton({data, nomeEstufa} : pdfProps) {

    const html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            border: 2px solid black;
            padding: 20px;
            margin: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h2>Relatório de Dados da ${nomeEstufa}</h2>
    <table>
        <thead>
            <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>Temperatura (°C)</th>
                <th>Umidade (%)</th>
            </tr>
        </thead>
        <tbody>         
            ${data.map((dados) => {
                return (
                    `
                    <tr>
                        <td>${new Date(dados.data).toLocaleString([], {day: "2-digit", month:"2-digit", year:"2-digit"})}</td>
                        <td>${new Date(dados.data).toLocaleString([], {hour: "2-digit", minute:"2-digit"})}</td>
                        <td>${dados.temperatura}</td>
                        <td>${dados.umidade}</td>
                    </tr>
                    `
                    )
            }).join('')}
        </tbody>
    </table>
</body>
</html>
` 

    const exportPDF = () => {
        let element = html;

        let opt = {
        margin:       10,
        filename:     'mypage.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    }

    return (
        <Button variant='text' style={{width: 30, height: 30, marginLeft: '90%'}} onClick={exportPDF}><PictureAsPdf style={{color: 'gray'}}/></Button> 
    )
  }
