<?php       
       require_once("server.php");
       
		$manhom=$_POST['manhom'];   
		$tennhom=$_POST['tennhom'];
		$iconnhom=$_POST['iconnhom'];   
	
        $sql="update NHOM set tennhom='".$tennhom."',iconnhom='".$iconnhom."' where manhom='".$manhom."'";
        
            if (mysqli_query($conn, $sql)) {
				if(mysqli_affected_rows($conn)>0){
					
                $res["success"] = 1; //{success:1} //thanh cong
				}
				else{
					$res["success"] = 0; //{success:0} //that bai
				}
            } else {
                $res["success"] = 0; //{success:0}  //that bai
            }
        
        echo json_encode($res);
		//echo $sql;
        mysqli_close($conn);
?>