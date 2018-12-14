
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $mail_to = "tester@cogitandus.com";

    # Sender Data
    $subject = 'Workshop website formulier';
    $name = trim($_POST["name"]);
    $surname = trim($_POST["surname"]);
    $company = trim($_POST["company"]);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST["phone"]);

    $companyname = trim($_POST["companyname"]);
    $street = trim($_POST["street"]);
    $zip = trim($_POST["zip"]);
    $city = trim($_POST["city"]);
    $btw = trim($_POST["btw"]);

    if (empty($name) or empty($surname) or empty($email) or empty($phone) or empty($subject) or empty($company) or empty($companyname) or empty($street) or empty($zip) or empty($city) or empty($btw)) {
        # Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Gelieve alle verplichte velden in te vullen.";
        exit;
    } else {
        # Mail Content
        $content = "PERSOONLIJKE GEGEVENS\n";
        $content .= "Naam:           $name $surname\n";
        $content .= "Bedrijf:        $company\n";
        if ($_POST['function']) {
            $function = $_POST['function'];
            $content .= "Functie:        $function\n";
        }
        $content .= "E-mail:         $email\n";
        $content .= "Telefoonnummer: $phone\n";
        if ($_POST['mobile']) {
            $mobile = $_POST['mobile'];
            $content .= "GSM-nummer:     $mobile\n";
        }
        $content .= "\nFACTURATIEGEGEVENS\n";
        if ($_POST['number']) {
            $number = $_POST['number'];
            $content .= "Bestelbonnummer: $number\n";
        }
        $content .= "Bedrijf:         $companyname\n";
        $content .= "Straat:          $street\n";
        $content .= "Postcode:        $zip\n";
        $content .= "Gemeente:        $city\n";
        $content .= "BTW-nummer:      $btw\n";
        if ($_POST['btwGuilty']) {
            $content .= "BTW-plichtig:    ja\n";
        } else {
            $content .= "BTW-plichtig:    nee\n";
        }

        # email headers.
        $headers = "From: $name &lt;$email&gt;";
        $headers = array();
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/plain; charset=iso-8859-1";
        $headers[] = "From: {$name} <{$email}>";
        $headers[] = "Reply-To: {$name} <{$email}>";
        $headers[] = "X-Mailer: PHP/" . phpversion();

        # Send the email.
        $success = mail($mail_to, $subject, $content, implode("\r\n", $headers), "-f" . $mail_to);
        if ($success) {
            # Set a 200 (okay) response code.
            http_response_code(200);
            echo "Bedankt. Je bericht is verzonden.";
        } else {
            # Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Er ging iets mis. Probeer het nogmaals.";
        }
    }

} else {
    # Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>