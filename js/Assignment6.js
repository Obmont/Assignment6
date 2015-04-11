function MenuChoice()
{
    if (document.getElementById("menu").value== "Create New Customer") 
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Edit Customer Shipping Information")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete Customer")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
}

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    //Collect Customer data from web page
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    
    //Create the parameter string.
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';
    
    //Checking for AJAx operation return.
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    
    //Start AJAX request.
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result1").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("result1").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function EditShippingInformation()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    //Collect Customer data from web page
    var orderid = document.getElementById("orderid").value;
    var shipname = document.getElementById("shipname").value;
    var shipaddress = document.getElementById("shipaddress").value;
    var shipcity = document.getElementById("shipcity").value;
    var shippostcode = document.getElementById("shippostalcode").value;
    
    //Create the parameter string.
    var neworder = '{"OrderID":"' + orderid + '","ShipName":"' + shipname + '","ShipAddress":"' + shipaddress + '","ShipCity":"' + shipcity + '","ShipPostcode":"' + shippostcode + '"}';
    
    //Checking for AJAx operation return.
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult2(result);
        }
    }
    
    //Start AJAX request.
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(neworder);
}

function OperationResult2(output)
{
    if (output == 1)
    {
        document.getElementById("result2").innerHTML = "The operation was successful!"
    }
    else if (output == -2)
    {
        document.getElementById("result2").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object."
    }
    else if (output == -3)
    {
        document.getElementById("result2").innerHTML = "Operation failed because a record with the supplied Order ID could not be found."
    }
    else
    {
        document.getElementById("result2").innerHTML = "Operation failed due to unspecified error.";
    }
}

function makesure()
{
    var delcheck = confirm("Are you sure you want to delete this user?")
    if ( delcheck == true)
    {
        DeleteCustomer();
    }
}

function DeleteCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    
    //Retreives the customer ID of the customer to be deleted.
    url += document.getElementById("custdelete").value;
    
    //Checking for AJAx operation return.
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult3(result);
        }
    }
    
    //Start AJAX request.
    objRequest.open("GET", url, true);
    objRequest.send();
}

function OperationResult3(output)
{
    if (output.DeleteCustomerResult.WasSuccessful == 1)
    {
        document.getElementById("result3").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("result3").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function makesure()
{
    var delcheck = confirm("Are you sure you want to delete this user?")
    if ( delcheck == true)
    {
        DeleteCustomer();
    }
}