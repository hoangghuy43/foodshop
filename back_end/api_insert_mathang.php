<?php
		require_once("server.php");//gọi file server.php $conn
		$mamh=$_POST['mamh'];   
		$malh=$_POST['malh'];
		$tenmh=$_POST['tenmh'];
		$dvt=$_POST['dvt'];
		$gia=$_POST['gia'];
		$hinh=$_POST['hinh'];
		$mota=$_POST['mota'];
		$giamgia=$_POST['giamgia'];
		$sqlkt="select COUNT(*) as 'total' from  mathang where mamh='".$mamh."'";
	    $rs=mysqli_query($conn,$sqlkt);
        $row=mysqli_fetch_array($rs);
        if((int)$row['total']>0){
			 $res["success"] = 2; //{success:2} //trung du lieu 
		}else{ 
        $sql="INSERT INTO `mathang`(`mamh`, `malh`, `tenmh`, `dvt`, `gia`, `hinh`, `mota`, `giamgia`) VALUES ('".$mamh."','".$malh."','".$tenmh."','".$dvt."','".$gia."','".$hinh."','".$mota."','".$giamgia."')";
      
       
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