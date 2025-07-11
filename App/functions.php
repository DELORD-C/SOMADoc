<?php

use JetBrains\PhpStorm\NoReturn;

session_start();

function env(string $key): null|bool|string
{
    $env = parse_ini_file('.env');

    return match ($env[$key] ?? null) {
        '1', 'true' => true,
        '0', 'false' => false,
        '' => null,
        default => $env[$key] ?? null,
    };
}

#[NoReturn] function render (string $path, array $vars): void
{
    $html = file_get_contents('App/Templates/'.$path);

    foreach ($vars as $key => $value) {
        $html = str_replace('{{ '.$key.' }}', $value, $html);
    }

    $html = str_replace('{{ flashes }}', generateFlashes(), $html);

    echo $html;
    exit();
}

function generateFlashes (): string
{
    $html = '';
    if (! empty($_SESSION['flash'])) {
        $html = '<div id="flashes" class="grid gap">';
        foreach ($_SESSION['flash'] as $key => $value) {
            $html .= '<div class="box '.$key.'">'.$value.'</div>';
            unset($_SESSION['flash'][$key]);
        }
        $html .= '</div>';
    }
    return $html;
}

#[NoReturn] function error (string $error): void
{
    render('Error.html', ['error' => $error]);
}

function flash (string $type, string $message): void
{
    $_SESSION['flash'][$type] = $message;
}

function parseDoc (): array
{
    if (! is_dir('Doc')) {
        error('No "Doc" directory was found.');
    }
    
    $tree = getDirectoryTree('Doc');
    
    if (empty($tree)) {
        error('The "Doc" directory is empty.');
    }

    return $tree;
}

function getDirectoryTree($dir): array
{
    $result = [];

    if (!is_dir($dir)) return $result;

    $items = scandir($dir);

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;

        $path = $dir . DIRECTORY_SEPARATOR . $item;

        if (is_dir($path)) {
            $result[$item] = getDirectoryTree($path);
            if (empty($result[$item])) {
                unset($result[$item]);
            }
        } else {
            $result[substr($item, 0, -3)] = $item;
        }
    }

    return $result;
}

function getRequestParams(): array
{
    return explode('/', trim(urldecode($_SERVER['REQUEST_URI']), '/'));
}

#[NoReturn] function redirectToHome(array $docs): void
{
    $dVersion = $dVersion ?? array_key_last($docs);
    $dFolder = $dFolder ?? array_key_first($docs[$dVersion]);
    if (! is_array($docs[$dVersion][$dFolder])) {
        error('Folders depth in the Doc folder isn\'t deep enough, are you sure you want to use Versions ?');
    }
    $dFile = array_key_first($docs[$dVersion][$dFolder]);
    $url = $dVersion.'/'.substr($dFolder, 5).'/'.substr($dFile, 5);
    header('Location: /'.$url);
    exit;
}

function generateNav(array $docs, bool|string $version, string $activeFolder, string $activeFile): string
{
    $base = '/';
    if ($version) {
        $base .= $version.'/';
    }

    $html = '';

    foreach ($docs as $folder => $value) {
        $folderName = substr($folder, 5);
        $html .= '<li>
            <input type="checkbox" id="'.$folderName.'"'.($activeFolder == $folderName ? ' checked' : '').'>
            <label for="'.$folderName.'">'.$folderName.'</label>
            <ul>';

        foreach ($value as $file => $type) {
            $html .= '<li><a class="'.($activeFile === substr($file, 5) ? 'active' : '').'" href="'.$base.substr($folder, 5).'/'.substr($file, 5).'">'.substr($file, 5).'</a></li>';
        }

        $html .= '</ul></li>';
    }

    return $html;
}

function generateVersionSelect(array $docs, false|string $version): string
{
    if (! $version || count($docs) === 1) {
        return '';
    }

    $html = '<select id="version" class="box">';

    foreach ($docs as $versionName => $content) {
        $html .= '<option'.($version === $versionName ? ' selected' : '').' value="'.$versionName.'">Version '.$versionName.'</option>';
    }

    return $html.'</select>';
}

function generateDataForSearch(array $doc, false|string $version): string
{
    $base = 'Doc/';
    $baseUrl = '/';
    if ($version) {
        $base .= $version.'/';
        $baseUrl .= $version.'/';
    }

    foreach ($doc as $folder => $files) {
        foreach ($files as $file => $v) {
            $raw = file_get_contents($base.$folder.'/'.$file.'.md');
            $raw = preg_replace('/```(.|\n)*?```/', '', $raw);
            $doc[$folder][$file] = explode(PHP_EOL, $raw);
            foreach ($doc[$folder][$file] as $line => $value) {
                $value = trim(str_replace('`', '', $value));
                unset($doc[$folder][$file][$line]);
                if (strlen($value) > 6 && str_starts_with($value, '#')) {
                    $doc[$folder][$file][$line]['content'] = htmlspecialchars($value);
                    preg_match_all('/#/', $value, $hashtags);
                    $compl = preg_replace('/[^A-z0-9]/', '', $value);
                    $doc[$folder][$file][$line]['link'] = $baseUrl.substr($folder, 5).'/'.substr($file, 5).'#pagenav-'.count($hashtags[0]).'-'.$compl;
                    $doc[$folder][$file][$line]['path'] = substr($folder, 5).'/'.substr($file, 5);
                }
            }
        }
    }

    return json_encode($doc);
}

function getLoading(): string
{
    return '<div id="loading" class="fixed full flex justify-center align-center bg-1">
        <img src="/Assets/loading.gif" alt="Loading">
    </div>';
}

function darkMode (bool $state): void
{
    $_SESSION['darkmode'] = $state ? '' : 'bright';
}