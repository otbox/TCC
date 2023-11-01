import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { historico } from "../pages/EstufaProfile";

interface pdfProps {
    data: historico[];
    nomeEstufa?: string;
}

export default function PdfPageGenerator({data, nomeEstufa} : pdfProps) {
    //const data1 = JSON.parse(data)
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
                ${data.reverse().map((dados) => {
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
    let gereratePdf = async () => {
        const file = await printToFileAsync({
            html: html,
            base64: false
        });
        await shareAsync(file.uri);
    }
    gereratePdf();
};
