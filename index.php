    <?php 
        function tolog($data)
        {
            echo '<script>console.log("'.print_r($data).'")</script>';
        }       
        include("head.php"); 
    ?>
    
    <section id="page">
        <?php include("./page/Home.php"); ?>
    </section>
    <script src="./assets/js/main.js" type="module"></script>
</body>
</html>