import chai, { expect } from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(function () {
    stubedFetch.restore();
  });
  
  describe('Smoke tests', function () {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('shoudl have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbum('2uaQ1K2eSqaWeVQRXeuGdN');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/2uaQ1K2eSqaWeVQRXeuGdN');

      const album2 = getAlbum('2uaQ1K2eSqaWeVQRXeuGdK');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/2uaQ1K2eSqaWeVQRXeuGdK');
    });
    
    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('2uaQ1K2eSqaWeVQRXeuGdN');

      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(stubedFetch).to.have.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['2uaQ1K2eSqaWeVQRXeuGdN', '2uaQ1K2eSqaWeVQRXeuGdK']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=2uaQ1K2eSqaWeVQRXeuGdN,2uaQ1K2eSqaWeVQRXeuGdK')
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const albums = getAlbums(['2uaQ1K2eSqaWeVQRXeuGdN', '2uaQ1K2eSqaWeVQRXeuGdK']);

      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = getAlbumTracks('2uaQ1K2eSqaWeVQRXeuGdN');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/2uaQ1K2eSqaWeVQRXeuGdN/tracks');

      const trackss = getAlbumTracks('2uaQ1K2eSqaWeVQRXeuGdK');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/2uaQ1K2eSqaWeVQRXeuGdK/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ tracks: 'name' });
      const tracks = getAlbumTracks('2uaQ1K2eSqaWeVQRXeuGdN');

      expect(tracks.resolveValue).to.be.eql({ tracks: 'name' });
    });
  });

});
