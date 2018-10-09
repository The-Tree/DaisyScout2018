<?php
include_once('Daisybase.php');

class DaisyScout
{
    private static $DB_PATH = '../DB/daisyscout.db';
    private static $_daisybase;

    public static function initializeDaisybase() {
        // Only try to connect to the database if it already exists and we can write to it
        if (!is_writable(self::$DB_PATH)) {
            throw new Exception('Database does not exist or is not writable.');
        }
        
        $_db = new SQLite3(self::$DB_PATH);
        self::$_daisybase = new Daisybase($_db);
    }
    
    public static function daisybase() {
        if (!self::$_daisybase) {
            self::initializeDaisybase();
        }
        
        return self::$_daisybase;
    }
}

?>