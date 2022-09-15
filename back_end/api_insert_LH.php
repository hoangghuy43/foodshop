<?php
		require_once("server.php");//gọi file server.php $conn
		$malh=$_POST['malh'];
		$tenlh=$_POST['tenlh'];   
		$manhom=$_POST['manhom'];   
		$sqlkt="select COUNT(*) as 'total' from  loaihang where malh='".$malh."'";
	    $rs=mysqli_query($conn,$sqlkt);
        $row=mysqli_fetch_array($rs);
        if((int)$row['total']>0){
			 $res["success"] = 2; //{success:2} //trung du lieu 
		}else{ 
        $sql="INSERT INTO `loaihang`(`malh`, `tenlh`, `manhom`) VALUES ('".$malh."','".$tenlh."','".$manhom."')";
      
       
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
        }
        echo json_encode($res);//trả về cho client 1 chuỗi json dạng mảng
		mysqli_close($conn);
?>