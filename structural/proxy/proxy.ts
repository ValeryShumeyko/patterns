// вместо реальных объектов предоставляет специальные объекты-заменители
// эти объекты перехватывают вызовы к оригиналам и позволяют делать что-то до или после обращения к оригинальному объекту
// прослойка, которая помогает произвести какие-то дополнительные манипуляции до того как отдать дальнейший контроль

/**
 * Интерфейс Субъекта объявляет общие операции как для Реального Субъекта, так и
 * для Заместителя. Пока клиент работает с Реальным Субъектом, используя этот
 * интерфейс, вы сможете передать ему заместителя вместо реального субъекта.
 */
interface Playlist {
    playSong(): void;
    downloadSong(): void;
}

class OnlineMusic implements Playlist {
    downloadSong(): boolean {
        console.log('Download the selected song');
        return true;
    };
    playSong() {
        console.log('The song is playing online');
    };   
}

/**
 * Интерфейс Заместителя идентичен интерфейсу Реального Субъекта.
 */
class CachedMusic implements Playlist {
    private onlineMusic: OnlineMusic;

    /**
     * Заместитель хранит ссылку на объект класса РеальныйСубъект. Клиент может
     * либо лениво загрузить его, либо передать Заместителю.
     */
    constructor(onlineMusic: OnlineMusic) {
        this.onlineMusic = onlineMusic;
    }

    /**
     * Наиболее распространёнными областями применения паттерна Заместитель
     * являются ленивая загрузка, кэширование, контроль доступа, ведение журнала
     * и т.д. Заместитель может выполнить одну из этих задач, а затем, в
     * зависимости от результата, передать выполнение одноимённому методу в
     * связанном объекте класса Реального Субъект.
     */
    public playSong(): void {
        if (this.checkCache()) {
            console.log('Play the downloaded song');
        } else {
            this.onlineMusic.playSong();
        }
    }

    private checkCache(): boolean {
        console.log('Proxy checks the cache for the selected song');
        return this.onlineMusic.downloadSong()
    }

    public downloadSong(): boolean {
        return true;
    };
}


function test(playlist: Playlist) {
    playlist.playSong();
}

console.log('Client: Executing the client code with a real subject:');
const onlineMusic = new OnlineMusic();
test(onlineMusic);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const cachedMusic = new CachedMusic(onlineMusic);
test(cachedMusic);