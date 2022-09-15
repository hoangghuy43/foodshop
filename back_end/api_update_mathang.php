<?php       
       require_once("server.php"); 
		$mamh=$_POST['mamh'];   
		$malh=$_POST['malh'];
		$tenmh=$_POST['tenmh'];
		$dvt=$_POST['dvt'];
		$gia=$_POST['gia'];
		$hinh=$_POST['hinh'];
		$mota=$_POST['mota'];
		$giamgia=$_POST['giamgia'];
	
        $sql="update mathang set malh='".$malh."',tenmh='".$tenmh."',dvt='".$dvt."' , gia='".$gia."', hinh='".$hinh."', mota='".$mota."', giamgia='".$giamgia."' where mamh='".$mamh."'";
        
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