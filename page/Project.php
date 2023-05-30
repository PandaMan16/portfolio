<div id="index_project" class="nes-container is-centered with-title is-rounded">
    <p class="title">Mes Projet</p>
    <div class="projectlist">
        <?php 

            $arrFiles = scandir('../project');
            $project = array();
            foreach($arrFiles as $key => $value)
            {
                if (is_dir("../project/".$value))
                {
                    if (!in_array($value,array(".","..")))
                    {
                        if(is_file("../project/".$value."/link.json")){
                            $sdir = "../project/".$value."/";
                            $idir = "./project/".$value."/";
                            $jsonString = file_get_contents($sdir."link.json");
                            $jsonData = json_decode($jsonString, true);
                            $jsonData["sdir"] = $idir;
                            $project[$key] = $jsonData;
                            
                            echo '<button type="button" data-id="'.$key.'" class="nes-btn"><p>'.$jsonData["name"].'</p><img src="'.$idir.$jsonData["image"]["desktop"].'"></button>';
                        }
                    }

                }
            }
        ?>
    </div>
</div>
<?php 
    foreach($project as $key => $value){?>
        <div id="project_<?php echo $key ?>" style="display: none;" class="project_x nes-container is-centered with-title is-rounded">
            <p class="title"><?php echo $value["name"] ?></p>
            <button class="back nes-btn is-error scroll-btn active"><i class="nes-icon close is-small"></i></button>
            <div>
                <?php if($value["image"]["desktop"]!= ""){?>
                    <img class="desktop" src="<?php echo "./".$value["sdir"]."/".$value["image"]["desktop"];?>" alt="screen desktop project <?php echo $value["name"]; ?>">
                <?php } ?>
                <?php if($value["image"]["mobile"] != ""){?>
                    <img class="mobile" src="<?php echo "./".$value["sdir"]."/".$value["image"]["mobile"];?>" alt="screen mobile project <?php echo $value["name"]; ?>">
                <?php } ?>
                <span class="text">Nom du project:<span><?php echo $value["name"]; ?></span><br>
                    <?php if($value["url"]["demo"]){
                        echo "lien vers la demo: <a href='https://".$value["url"]["demo"]."' target='_blank'>".$value["url"]["demo"]."</a> <br>"; 
                    } ?>
                    <?php if($value["url"]["github"]){
                        echo "lien vers github: <a href='https://".$value["url"]["github"]."' target='_blank'>".$value["url"]["github"]."</a> <br>"; 
                    } ?>
                    <?php echo "Description:<span>".$value["description"]."</span>"; ?>
                </span>
            </div>
        </div>
    <?php
    }
?>