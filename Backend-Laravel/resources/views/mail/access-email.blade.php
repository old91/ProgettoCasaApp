<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TENTATIVO DI ACCESSO NON AUTORIZZATO</title>
</head>
<body>
    <div class ="principal">
        <img class="image" src= "{{asset('assets/logo.png')}}">
        <div class="content">
            <h1 class="text">
                {{$surname}} {{$name}} qualcuno ha tentato di effettuare l'accesso al suo account da un dispositivo non autorizzato!
            </h1>
            <h3 class="subtext"> 
                Per la sicurezza dei dati la invitiamo gentilmente ad rieffettuare il login e a modificare la password!
            </h3>
            <h3 class="subtext"> 
            Dispositivo che ha tentato l'accesso:
            </h3>
            
            <h1 class="password">
                {{$device}}
            </h1>
        </div>
        <div class="footer">
            <p>
                Questa email viene generata automaticamente quindi non rispondere a questa email.
            </p>
            <p>
                Se dovesse essere recapitata per errore si prega di ignorarla.
            </p>
        </div>
    </div>
</body>
</html>
<style>
    .principal{
        text-align:center;
        background-color:#f0f0f0
    }
    .image{
        width: 100%;
        background-color: black
    }
    .content{

    }
    .password{
        color: rgb(184, 30, 30);
        margin: 130px 0px 130px 0px;
        font-weight: bolder;
        font-size: 70px;
    }
    .footer{
        margin-top: 140px
    }

</style>