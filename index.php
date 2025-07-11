<?php

include('App/functions.php');

$params = getRequestParams();

if ($params[0] === 'darkmode') {
    darkMode(! isset($params[1]) || $params[1] === 'true');
    exit;
}

$docs = parseDoc();

if ($params[0] === '') {
    redirectToHome($docs);
}

if (! isset($docs[$params[0]])) {
    flash("error", "Unknown version number.");
    redirectToHome($docs);
}

$version = $params[0];
$folder = $params[1] ?? null;
$file = $params[2] ?? null;

if (! $folder || ! $file) {
    redirectToHome($docs);
}

$trueFolder = false;
$trueFile = false;

foreach ($docs[$version] as $tFolder => $content) {
    if (substr($tFolder, 5) === $folder) {
        $trueFolder = $tFolder;
    }
    foreach ($docs[$version][$tFolder] as $tFile => $contentFile) {
        if (substr($tFile, 5) === $file) {
            $trueFile = $tFile;
            break;
        }
    }
}

if (! $trueFolder || ! $trueFile || ! isset($docs[$version][$trueFolder][$trueFile])) {
    flash("error", "Page not found");
    redirectToHome($docs, $version);
}

render('Doc.html', $data = [
    'nav' => generateNav($docs[$version], $version, $folder, $file),
    'md' => file_get_contents('Doc/'.trim($version.'/'.$trueFolder.'/'.$trueFile.'.md')),
    'versions' => generateVersionSelect($docs, $version),
    'data' => generateDataForSearch($docs[$version], $version),
    'app_name' => env('APP_NAME') ?? 'SOMADoc',
    'title' => $folder.' - '.$file,
    'loading' => env('LOADING') ? getLoading() : '',
    'theme' => $_SESSION['darkmode'] ?? '',
    'darkmode' => ($_SESSION['darkmode'] ?? null) === 'bright' ? 'checked' : '',
]);