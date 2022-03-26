<?php
 include 'db.php'; 
    $response = array();
	$content = trim(file_get_contents("php://input"));
	$decoded = json_decode($content,true);

	$mobile = $decoded['mobile']; 
		$email = $decoded['email']; 

    $password = $decoded['password'];
    $name = $decoded['name'];
    $cpassword = $decoded['cpassword'];
    $otp = $decoded['otp'];
    $image = $decoded['image'];

    $type = $decoded['type'];  
    $logintype = $decoded['value'];   



// $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image));

       if($type == 'Login'){
       		if(!empty($email) && !empty($password)){
       			 $fetch = $connection->query("SELECT * from UserRegistrationTable where email = '$email' and password = '$password'");
       			if ($fetch->num_rows === 1) {
				$userDetails = $fetch->fetch_assoc();
				$response['status'] = 200;
				$response['msg'] = "Login Successfully";
				$response['userDetails']['name'] = $userDetails['name'];
				$response['userDetails']['email'] = $userDetails['email'];
				// $response['userDetails']['image'] = $userDetails['image'];

				} else {
					$response['status'] = 404;
					$response['msg'] = "Invalid email id and password!";
				}
       		}else{
       			    $response['status'] = 0;
					$response['msg'] = "Please enter valid username and password!";
       		}
       		
       }else if($type == 'Register'){
		       	if(!empty($email) && !empty($password) && !empty($cpassword) && !empty($name)){

		       		if($password === $cpassword){
		       			 $Sql_Query ="SELECT * from UserRegistrationTable where email = '$email'";
		       			 $check = mysqli_query($connection,$Sql_Query);
		       			 if ($check->num_rows === 1) {
		       			 	
		       			 	$response['status'] = 301;
					        $response['msg'] = "Email Already Exist, Please Try Again !!!";
		       			 }else{

		     //   			 	 $file_name = $_FILES['image']['tmp_name'];
						 // $file_tmp_name = $_FILES['image']['name'];
						 // $kaboom = explode(".", $file_tmp_name);
						 // $ext = end($kaboom);
						 // $picnameold = rand(10,1000000);
						 // $time = time();
						 // $image1 = $picnameold.$time.".".$ext;
						 // move_uploaded_file($file_name, "img/$new_name");
		       			 	//$stmt = send_long_data(1, base64_decode($image));
		       			 	
		       			 	 $Sql_Query = "INSERT INTO UserRegistrationTable (name,email,password,image) values ('$name','$email','$password','$image')";
		       			 	 // $response =$Sql_Query;
		       			 	
		       			 	 if(mysqli_query($connection,$Sql_Query)){
								$response['status'] = 200 ;
								$response['msg'] = 'Registered Successfully';
								$response['userDetails']['name'] = $name;
					            $response['userDetails']['email'] = $email;
					            // $response['userDetails']['image'] = $image;
									// $response['sql'] = $Sql_Query ;


								 
								}else{
									$response['status'] = 201 ;
									// $response['sql'] = $Sql_Query ;
								$response['msg'] = 'Plese Try Later!';
								}
		       			 }
		       			

		       		}else{
		       			$response['status'] = 300;
					    $response['msg'] = "Password not matched!";
		       		}


		       	}else{
		       		$response['status'] = 0;
					$response['msg'] = "Please enter details!";
		       	}
          	//$response = $name;

       }else if($type == 'SENDOTP'){
       			
       				 $Sql_Query ="SELECT * from UserRegistrationTable where mobile = '$mobile'";
		       		$check = mysqli_query($connection,$Sql_Query);
		       		if ($check->num_rows === 1) {

		       			$Sql_Query = "UPDATE UserRegistrationTable SET otp='123456' Where mobile='$mobile'";
		       			 if(mysqli_query($connection,$Sql_Query)){
		       			 	$response['status'] = 200 ;
							$response['msg'] = 'OTP send Successfully!';
		       			 }

		       			 }else{
                    		 $response['status'] = 0;
							 $response['msg'] = "Please enter register mobile number!";
		       			 }

       			

       }else if($type =='Forgot Password'){

	       if(!empty($mobile) && !empty($otp) && !empty($password) && !empty($cpassword)){
	       			if($password === $cpassword){
	       				 $fetch = $connection->query("SELECT * from UserRegistrationTable where mobile = '$mobile'");
			       			if ($fetch->num_rows === 1) {
							$userDetails = $fetch->fetch_assoc();

								if($userDetails['otp'] == $otp){
							 	   $Sql_Query = "UPDATE UserRegistrationTable SET password='$password',otp= 'null' Where mobile='$mobile'";
					       			 if(mysqli_query($connection,$Sql_Query)){
					       			 	$response['status'] = 200 ;
										$response['msg'] = 'Password change Successfully';
					       			 }
								}else{
                                 $response['status'] = 301;
				                 $response['msg'] = "OTP not matched!";
								}
						   }


	       			}else{
	       				$response['status'] = 300;
				       $response['msg'] = "Password not matched!";
	       			}

	       	}else{
	       		 $response['status'] = 0;
				$response['msg'] = "Please enter details";
	       	}

       }else if($type == 'cal'){
       		$Sql_Query = "UPDATE UserRegistrationTable SET l_finger='$logintype' Where email='$email'";
       		// $response['status'] = 200 ;
		       			 if(mysqli_query($connection,$Sql_Query)){
		       			 	$response['status'] = 200 ;
							$response['msg'] = 'status changed!';
		       			 }
       }else if($type =='finlo'){
       	$Sql_Query = "UPDATE UserRegistrationTable SET l_image='$logintype' Where email='$email'";
       		// $response['status'] = 200 ;
		       			 if(mysqli_query($connection,$Sql_Query)){
		       			 	$response['status'] = 200 ;
							$response['msg'] = 'status changed!';
       }
   }

		
		
	
	

 echo json_encode($response);
 mysqli_close($connection);
?>