<?php
/**  淘宝API的各种KEY的配置类  **/
$urlget1="http://gw.api.tbsandbox.com/router/rest";   
$url1="<script language='JavaScript'>alert('error！');history.go(-1);</script>"; 
define('AULG1', $urlget1);
define('AUL1', $url1);
class Taoapi_Config
{
    private $_Config;
    /**
     * @var  Taoapi_Config
     */
    private static $_init;
    /**
     * @return Taoapi_Config
     */
    public static function Init ()
    {
        if (! self::$_init) {
            self::$_init = new Taoapi_Config();
        }
        return self::$_init;
    }
    /**
     * @return Taoapi_Config
     */
    public function setTestMode ($test = true)
    {
        if ($test) {
            $this->_Config['Url'] = 'http://gw.api.tbsandbox.com/router/rest';
        } else {
            //$this->_Config['Url'] = 'http://gw.api.taobao.com/router/rest';
            $this->_Config['Url'] = 'http://110.75.1.12/router/rest';
        }
        return $this;
    }
    public function getAppURL ()
    {
        return $this->_Config['Url'];
    }
    /**
     * @return Taoapi_Config
     */
    public function setVersion ($version,$signmode = 'md5')
    {
        $this->_Config['version'] = array('version'=>$version,'signmode'=>$signmode);
        return $this;
    }
    public function getVersion ()
    {
       return !empty($this->_Config['version']) ? $this->_Config['version'] : array('version'=>1,'signmode'=>'md5');
    }
    public function getAppKey ()
    {
        return ! empty($this->_Config['appKey']) ? $this->_Config['appKey'] : '';
    }
    public function getAppSecret ()
    {
        return ! empty($this->_Config['appSecret']) ? $this->_Config['appSecret'] : '';
    }
    /**
     * @return Taoapi_Config
     */
    public function setAppKey ($key)
    {
        $this->_Config['appKey'] = $key;
        return $this;
    }
    /**
     * @return Taoapi_Config
     */
    public function setAppSecret ($Secret)
    {
        $this->_Config['appSecret'] = $Secret;
        ;
        return $this;
    }
}
?>