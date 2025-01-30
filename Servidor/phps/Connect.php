<?php 
    $sever= "localhost";
    $bd = "id21200849_conglomerado";
    $user = "id21200849_admin";
    $passw = "BancodaHora10@";
    
    function SelectUser($conn, $content) {
        $idEmpresa = $content['idEmpresa'];

        if(mysqli_connect_errno()){
            echo "conncetion failed". mysqli_connect_errno();
        }else{
            $result = mysqli_query($conn, "Select * from usuarios where fk_idEmpresa_u ='$idEmpresa'");
            $row = mysqli_fetch_all($result);
            echo json_encode($row);
        }
    }
    function addUser($conn, $content){
        $idEmpresa = $content['idEmpresa'];
        $nivel = $content['nivel'];
        $passw = $content['passw'];
        $usuario = $content['nome'];
        $ativo = $content['ativo'];
        
        if(mysqli_connect_errno()){
            echo "conncetion failed". mysqli_connect_errno();
        }else{
            $query = "INSERT INTO `usuarios`(`fk_idEmpresa_u`, `Nivel`, `Nome`, `Senha`, `Ativo`) VALUES ('$idEmpresa','$nivel','$usuario','$passw',$ativo)";
            $result = mysqli_query($conn, $query);
            if($result == TRUE){
            echo 'Success';
            }else{
            echo 'Failed'. $query . '  ' .$result;
            }
        }
    }
    
    function alterUser($conn, $content) {
        $idUsuario = $content['idUsuario'];
        $nivel = $content['nivel'];
        $passw = $content['passw'];
        $usuario = $content['nome'];
        $ativo = $content['ativo'];
        
        if(mysqli_connect_errno()){
            echo "conncetion failed". mysqli_connect_errno();
        }else{
            $query = "UPDATE `usuarios` SET `Nivel`='$nivel',`Nome`='$usuario',`Senha`='$passw',`Ativo`= $ativo WHERE idUsuarios = $idUsuario";
            $result = mysqli_query($conn,$query);
            if($result == TRUE){
            echo 'Success';
            }else{
            echo 'Failed'. $query . '  ' .$result;
            }
        }
    }
    
    function deleteUser($conn, $content){
        $idUsuario = $content['idUsuario'];
        $query = "DELETE FROM `usuarios` WHERE idUsuarios = $idUsuario";
        $result = mysqli_query($conn,$query);
        if($result == TRUE){
            echo 'Success';
            }else{
            echo 'Failed'. $query . '  ' .$result;
            }
    }
    function getAllEstufas($conn, $content){
        $idEmpresa = $content['idEmpresa'];
        
       if(mysqli_connect_errno()){
            echo "conncetion failed". mysqli_connect_errno();
        }else{
            $query = "SELECT estufa.*, historico.Temp, historico.Umi, historico.Momento
            FROM estufa
            INNER JOIN historico ON estufa.idEstufa = historico.fk_idEstufa
            WHERE historico.Momento = (SELECT MAX(historico.Momento) FROM historico WHERE fk_idEstufa = estufa.idEstufa) and estufa.fk_idEmpresa = '$idEmpresa'";
            $result = mysqli_query($conn, $query);
            $row = mysqli_fetch_all($result);
            echo json_encode($row);
        }
    }
    
    function getEstufa($conn, $content){
        $idEmpresa = $content['idEmpresa'];
        $idEstufa = $content['idEstufa'];
        
        
       if(mysqli_connect_errno()){
            echo "conncetion failed". mysqli_connect_errno();
        }else{
            $query = "Select * from historico where fk_idEstufa ='$idEstufa' ORDER BY Momento desc LIMIT 20";
            $result = mysqli_query($conn, $query);
            $row = mysqli_fetch_all($result);
            echo json_encode($row);
        }
    }
?>