<?php 
  function addEstufa($conn, $content){
    $nome = $content['nome'];
    $idEmpresa = $content['fk_idEmpresa'];
    $idEstufa = $content['idEstufa'];
    $tipo = 1;
    $diasCultivo = 0;
    $temp = $content['temp'];
    $umid = $content['umidade'];
    $status = $content['status'];
    $notifs = "null";
    
    $query = "INSERT INTO `estufa`(`idEstufa`, `fk_idEmpresa`, `Nome`, `Tipo`, `DiasCultivo`, `TempAlvo`, `UmiAlvo`, `Status`, `Notifs`) VALUES ('$idEstufa','$idEmpresa','$nome','$tipo','$diasCultivo','$temp','$umid','$status',$notifs)";

    $result = mysqli_query($conn, $query);
    if($result == TRUE){
        echo 'Success';
        }else{
        echo 'Failed'. $query . '  ' .$result;
        }
    }
    
    function VerifyEstufa($conn,$content){
        $idEstufa = $content['idEstufa'];
        
        $query = "Select count(*) from estufa where idEstufa='$idEstufa'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_all($result);
        echo $row[0][0];
    }
    
    function getEstufaInfo($conn, $content){
        $idEstufa = $content['idEstufa'];
        
        $query = "Select UmiAlvo, TempAlvo from estufa where idEstufa='$idEstufa'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_all($result);
        echo $row[0][0];
        echo $row[0][1];
    }
    
    function addHistorico($conn,$content){
        $idEstufa = $content['idEstufa'];
        $temp = $content['temp'];
        $umid = $content['umidade'];
        date_default_timezone_set('America/Sao_Paulo');
        $currentDate = date('Y-m-d H:i:s');
        
        $query = "INSERT INTO `historico`(`fk_idEstufa`, `Momento`, `Temp`, `Umi`) VALUES ('$idEstufa','$currentDate','$temp','$umid')";
        $result = mysqli_query($conn,$query);
        if($result == TRUE){
        echo 'Adicionado Historico com Sucesso';
        }else{
        echo 'Failed'. $query . '  ' .$result;
        }
    }
    
    function UpdateEstufaAlvos($conn, $content){
        $idEstufa = $content['idEstufa'];
        $TempAlvo = $content['tempAlvo']; 
        $UmiAlvo = $content['umiAlvo']; 
        $query = "UPDATE `estufa` SET `TempAlvo`='$TempAlvo',`UmiAlvo`='$UmiAlvo' WHERE idEstufa = $idEstufa";
        $result = mysqli_query($conn, $query);
        if ($result == true){
            echo "Success";
        }else{
            echo "Failed" . $query . '  ' .$result;
        }
        
    }
    
    
    function UpdateEstufa($conn, $content) {
    //$idEmpresa = $content['fk_idEmpresa'];
    $idEstufa = $content['idEstufa'];
    $tipo = 1;
    $diasCultivo = 0;
    $status = $content['status'];
    $notifs = "null";  
    
        
    $getDays = "SELECT TIMESTAMPDIFF(day, min(Momento), max(Momento)) as Dias, TIMESTAMPDIFF(hour, max(Momento), CONVERT_TZ(NOW(), '+00:00', '-03:00')) as Hora from historico where fk_idEstufa = $idEstufa";    
        if(mysqli_connect_errno()){
                echo "conncetion failed". mysqli_connect_errno();
            }else{
            $result = mysqli_query($conn,$getDays);
            $getTime = mysqli_fetch_all($result);
            //GetTime[0][0] se refere os dias de diferenças e [1] é as horas
            if ($getTime[0][1] >= 2){
                $status = 3;
            }
            $day = $getTime[0][0];
            $query = "UPDATE `estufa` SET `DiasCultivo`='$day',`Status`='$status' WHERE idEstufa = $idEstufa";
            $result = mysqli_query($conn,$query);
            if($result == TRUE){
            echo 'Successo no Update';
            }else{
            echo 'Failed'. $query . '  ' .$result;
            }
                //$result = mysqli_query($conn, $query);
                //$row = mysqli_fetch_all($result);
                //echo json_encode($row);
            }
   
    
        
    }
    function teste(){
        $timestamp = time();
        $currentDate = gmdate('Y-m-d H:i:s', $timestamp);
        echo $currentDate;
    }
?>