<?php 
    function SelectUser($conn, $content) {
        $user = $content['user'];
        $passw = $content['passw'];
        
        if(mysqli_connect_errno()){
            echo "conncetion failed". mysqli_connect_errno();
        }else{
            $result = mysqli_query($conn, "Select * from usuarios");
            $row = mysqli_fetch_all($result);
            echo json_encode($row);
        }
    }
    
    function addUser($conn, $content) {
        $username = $content['username'];
        $passw = $content['password'];
        $ativo = $content['ativo'];
        $nivel = $content['nivel'];
        
         if(mysqli_connect_errno()){
            echo "conncetion failed". mysqli_connect_errno();
        }else{
            $result = mysqli_query($conn, "Select * from usuarios");
            $row = mysqli_fetch_all($result);
            echo json_encode($row);
        }
    }
?>