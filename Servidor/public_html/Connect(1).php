<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Origin: *");


    include '../phps/Connect.php';
    include '../phps/arduino.php';
    $method = $_SERVER['REQUEST_METHOD'];
    
    $conn = new mysqli($sever,$user,$passw,$bd);

    //Essa Parte serve para a Seleção da Operação no BD
    
    $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
    if(isset($data['Operation'])){ 
        $WhoOperation = $data['Operation'];
        $content = $data['Content'];
        
        switch ($WhoOperation) {
            case 'select':
                SelectAllEmpresas($conn);
                break;
                
            case 'getEmpresa':
                GetEmpresa($conn, $content);
                break;
                
            case 'VerifyAccount':
                getUser($conn, $content);
                break;
                
            case 'selectUsers': 
                SelectUser($conn,$content);
                break;
            case 'addUser':
                addUser($conn,$content);
                break;
            case 'deleteUser':
                deleteUser($conn,$content);
                break;
            case 'alterUser':
                alterUser($conn,$content);
                break;  
            case 'getEstufa':
                getEstufa($conn,$content);
                break;
            case 'getAllEstufas':
                getAllEstufas($conn, $content);
                break;
            case 'addEstufa':
                addEstufa($conn, $content);
                break;
            case 'VerifyEstufa':
                VerifyEstufa($conn,$content);
                break;
            case 'addHistorico':
                addHistorico($conn,$content);
                break;
            case 'UpdateEstufa':
                UpdateEstufa($conn,$content);
                break;
            case 'UpdateAlvos':
                UpdateEstufaAlvos($conn,$content);
                break;
            case 'getEstufaAlvo':
                getEstufaInfo($conn,$content);
                break;
            default:
                error404();
        }
    }else{
        error404();
    }
    
    function getUser($conn, $content){
        $user = $content['user'];
        $passw = $content['passw'];
        
        if(mysqli_connect_errno()){
            echo "conncetion failed". mysqli_connect_errno();
        }else{
            $result = mysqli_query($conn, "Select * from usuarios where Nome = '$user' and Senha = '$passw'");
            $row = mysqli_fetch_all($result);
            echo json_encode($row);
        }
    }

   
    function SelectAllEmpresas($conn):void {
        if (mysqli_connect_errno()){
            echo "Connection failed" . mysqli_connect_error();
        }else{
            $result = mysqli_query($conn,'Select * from empresa');
            $row = mysqli_fetch_all($result);
            echo json_encode($row);
        }
    }
    
    function error404():void {
        echo "<div style='text-align: center; margin-top: 40%'><h1>404</h1> <p>Page Not Found</p></div>";
    }
?>