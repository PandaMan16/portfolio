<?php
// Endpoint de l'API pour envoyer l'e-mail
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer le corps de la requête POST
    $postData = file_get_contents('php://input');

    // Décoder les données JSON
    $data = json_decode($postData, true);

    // Vérifier si les données ont été décodées avec succès
    if ($data === null) {
        // Erreur lors du décodage JSON
        $response = [
            'success' => false,
            'message' => 'Erreur lors de la lecture des données JSON.'
        ];
    } else {
        // Récupérer les valeurs des paramètres de l'e-mail
        $to = $data['to'];
        $from = $data['from'];
        $subject = $data['subject'];
        $message = $data['message'];

        // En-têtes de l'e-mail
        $headers = 'From: ' . $from . "\r\n" .
            'Reply-To: ' . $data['reply'] . "\r\n" .
            'X-Mailer: PHP/' . phpversion() . "\r\n" .
            'Content-Type: text/html; charset=UTF-8'; // Spécifier le contenu HTML

        // Convertir les caractères spéciaux en entités HTML
        $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

        // Envoyer l'e-mail
        if (mail($to, $subject, $message, $headers)) {
            $response = [
                'success' => true,
                'message' => 'L\'e-mail a été envoyé avec succès.'
            ];
        } else {
            $response = [
                'success' => false,
                'message' => 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail.'
            ];
        }
    }

    // Renvoyer la réponse en tant que JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>