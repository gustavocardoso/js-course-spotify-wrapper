import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch')

import { search, searchAlbums, searchTracks, searchArtists, searchPlaylists } from '../src/main';

describe('Spotify Web', function() {
  
  describe('Smoke Tests', function() {
    //search genérico: + de um tipo
    //searchAlbums
    //searchTracks
    //searchArtist
    //searchPlaylists

    it('should exist the search method', function() {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', function() {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchTracks method', function() {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchArtists method', function() {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchPlaylists method', function() {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', function() {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', function() {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', function() {
      context('passing one type', () => {
        const artists = search('Ghost', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost&type=artist');

        const albums = search('Ghost', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Ghost', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost&type=artist,album');
      });
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Ghost', ['artist', 'album']);
      console.log(artists)
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

});
