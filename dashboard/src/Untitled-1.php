<?php 
    $sever= "localhost";
    $bd = "id21200849_conglomerado";
    $user = "id21200849_admin";
    $passw = "BancodaHora10@";
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    //header('Content-Type: application/json');
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    $conn = mysqli_connect($sever,$user,$passw,$bd);
    if (!$conn) {
    die(json_encode(['error' => "Connection failed: " . mysqli_connect_error()]));
    }
    //Essa Parte serve para a Seleção da Operação no BD
    if(isset($_GET['Operation'])){ 
        $WhoOperation = $_GET['Operation'];
        switch ($WhoOperation) {
            case 'select':
                SelectAllEmpresas($conn);
                break;
                
            case 'getEmpresa':
                GetEmpresa($conn, $method);
                break;
            default:
                error404();
    }
    }else{
        error404();
    }
    function error404():void {
       // echo json_encode(['error' => '404 - Page Not Found']);

        echo "<div style='text-align: center; margin-top: 40%'><h1>404</h1> <p>Page Not Found</p></div>";
    }
    
    function getEmpresa2($conn, $method) {
    $inputContent = file_get_contents("php://input");
    
    // Verifique se temos algo no inputContent
    if (!$inputContent) {
        echo json_encode(['error' => 'No input received']);
        return;
    }

    $data = json_decode($inputContent, true);

    // Verifique se houve um erro na decodificação do JSON
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['error' => 'Error decoding JSON', 'json_error' => json_last_error_msg()]);
        return;
    }

    if (isset($data['Nome'])) {
        $nome = $data['Nome'];
        echo json_encode(['nome' => $nome]);
    } else {
        error404();
    }
    }

    function GetEmpresa($conn, $method){
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        $task = $data['Nome'];
        echo($task);
        
        //$data = json_decode(file_get_contents("php://input"), true);
        //echo $data['Nome'];
        //if(isset($data['Nome'])){
        //    $nome = $data['Nome'];
        //    echo $nome;
        //}else{
            //error404();
        //}
        //if(isset($_POST('Nome'))){
        //    $nome = json_decode($_POST('Nome'));
        //    echo $nome; 
        //}else{
        //    error404();
        //}
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
    
    function getAllHistory($conn):void{
        $conn
    }
    function getAllEstufas ($conn) : void {

    }
    function getEstufaStatus ($conn , $id): void  {
        $mysqli->real_escape_string($id)

    }
    function addUser ($conn, $content): void {
    }
    function removeUser($conn, $id): void{

    }
    function getEmpresa($conn): void{
        
    }
    function getUsuario($conn, $content){
        $nome = $content["Nome"];
        $passw = $content["Passw"];

        $mysqli->query($conn)
    }

?>