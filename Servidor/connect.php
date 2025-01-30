<?php 
$sever= "localhost";
$bd = 'id21631877_lojaesdatabase';
$user = 'id21631877_otboxes';
$passw = 'BancodaHora10@';

function addProducts($conn, $content){
    $nome = $content['nome'];
    $preco = $content['preco'];
    $endereco = $content['endereco'];
    
if(mysqli_connect_errno()){
            echo "conncetion failed". mysqli_connect_errno();
        }else{
            $query = "INSERT INTO `produtos`(`nome`, `endereco`, `preco`) VALUES ('$nome','$endereco','$preco')";
            $result = mysqli_query($conn, $query);
            if($result == TRUE){
            echo 'Success';
            }else{
            echo 'Failed'. $query . '  ' .$result;
            }
        }
    
}
?>