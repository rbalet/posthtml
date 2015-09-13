/* jshint mocha: true, maxlen: false */
import posthtml from '../index.js';
import { expect } from 'chai';

const html = '<div class="button"><rect/><div class="button__text">Text</div></div>';
const tree = [{
    attrs: {
        class: 'button'
    },
    content: [
        { tag: 'rect' },
        {
            attrs: {
                class: 'button__text'
            },
            content: [
                'Text'
            ]
        }
    ]
}];

function testPluginsArray(nodes, options, done) {
    expect(posthtml([ json => json, json => json ])
        .process(nodes, options)
        .then(result => {
            expect(html).to.eql(result.html);
            done();
        }).catch(error => done(error)));
}

function testPluginUse(nodes, options, done) {
    expect(posthtml()
        .use(json => json)
        .use(json => {}) // jshint ignore: line
        .process(nodes, options)
        .then(result => {
            expect(html).to.eql(result.html);
            done();
        }).catch(error => done(error)));
}

describe('Plugins', () => {

    describe('posthtml([plugins])', () => {

        it('options default', done => {
            testPluginsArray(html, {}, done);
        });

        it('set options skipParse', done => {
            testPluginsArray(tree, { skipParse : true }, done);
        });

    });

    describe('use(plugin)', () => {

        it('options default', done => {
            testPluginUse(html, {}, done);
        });

        it('set options skipParse', done => {
            testPluginUse(tree, { skipParse : true }, done);
        });

    });

});
