<?php

include('App/functions.php');

$params = getRequestParams();

if ($params[0] === 'darkmode') {
    darkMode(! isset($params[1]) || $params[1] === 'true');
    exit;
}

$docs = parseDoc();
$version = env('VERSIONS') ?? false;

if ($version) {
    if ($params[0] === '') {
        redirectToHome($docs, true);
    }

    if (! isset($docs[$params[0]])) {
        flash("error", "Unknown version number.");
        redirectToHome($docs, true);
    }

    $version = $params[0];
    $folder = $params[1] ?? null;
    $file = $params[2] ?? null;
} else {
    $folder = $params[0] ?? null;
    $file = $params[1] ?? null;
}

if (! $folder || ! $file) {
    redirectToHome($docs, $version);
}

if ($version) {
    $doc = $docs[$params[0]];
} else {
    $doc = $docs;
}

$trueFolder = false;

foreach ($doc as $tFolder => $content) {
    if (substr($tFolder, 5) === $folder) {
        $trueFolder = $tFolder;
        break;
    }
}

if (! $trueFolder || ! isset($doc[$trueFolder][$file])) {
    flash("error", "Page not found");
    redirectToHome($docs, $version);
}

render('Doc.html', $data = [
    'nav' => generateNav($doc, $version, $folder, $file),
    'md' => file_get_contents('Doc/'.trim($version.'/'.$trueFolder.'/'.$file.'.md')),
    'versions' => generateVersionSelect($docs, $version),
    'data' => generateDataForSearch($doc, $version),
    'app_name' => env('APP_NAME') ?? 'SOMADoc',
    'title' => $folder.' - '.$file,
    'loading' => env('LOADING') ? getLoading() : '',
    'theme' => $_SESSION['darkmode'] ?? '',
    'darkmode' => ($_SESSION['darkmode'] ?? null) === 'bright' ? 'checked' : '',
]);