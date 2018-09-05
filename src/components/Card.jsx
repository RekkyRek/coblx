import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/xcode'

import ReactJson from 'react-json-view'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      consoleOpen: false
    }
    this.initialCode = this.props.code
  }
  onChange (code) {
    this.props.editCode(code)
  }
  run () {
    try {
      let code = this.props.code
      let argsUnmapped = this.refs.args.innerText
      argsUnmapped = argsUnmapped.split(',')

      let args = {}
      argsUnmapped.forEach(arg => {
        let argVal = arg.split(':').slice(1).join(',').trim()
        args[arg.split(':')[0].trim()] = isNaN(argVal) ? argVal : parseFloat(argVal)
      })

      let evalCode = `
        (function () {
          var COBLXLOG = []
          var COBLXVARS = JSON.parse(\`${JSON.stringify(args)}\`)
          function log() {
            var lstr = ''
            for (var i = 0; i < arguments.length; i++) {
              if(typeof(arguments[i]) === 'object') {
                COBLXLOG.push(lstr)
                COBLXLOG.push(arguments[i])
                lstr = ''
              } else {
                lstr += arguments[i]
              }
            }
            if(lstr.length > 0) COBLXLOG.push(lstr)
          }

          function getArg(arg) {
            return COBLXVARS[arg]
          }

          ${code}

          return COBLXLOG
        }).call({})
      `

      let evalout = eval(evalCode) // eslint-disable-line

      this.refs.console.innerHTML = ''

      evalout.forEach(out => {
        if (typeof (out) === 'object') {
          let div = document.createElement('div')
          div.className = 'cardConsoleEntryJSON'
          this.refs.console.appendChild(div)
          ReactDOM.render(<ReactJson
            src={out}
            iconStyle='triangle'
            enableClipboard={false}
            name={false}
          />, div)
        } else {
          let p = document.createElement('p')
          p.className = 'cardConsoleEntry'
          p.innerHTML = `<b>></b> ${out}`
          this.refs.console.appendChild(p)
        }
      })

      this.setState({ consoleOpen: true })

      console.log(args, evalout)
    } catch (e) {
      console.log(e)
    }
  }
  render () {
    return (
      <div className='card'>
        <div className='cardHeader'>
          <p className='cardTitle' contentEditable suppressContentEditableWarning onBlur={(e) => this.props.editTitle(e.target.innerText)}>{this.props.title}</p>
          <button className='cardDelete' onClick={this.props.action}>X</button>
        </div>
        <div className={`cardEditor ${this.state.consoleOpen ? 'cardConsoleOpen' : ''}`}>
          <AceEditor
            mode='javascript'
            theme='xcode'
            name={`${this.props.id}_editor`}
            onLoad={this.onLoad}
            onChange={this.onChange.bind(this)}
            fontSize={13}
            showPrintMargin
            showGutter
            highlightActiveLine
            value={this.props.code}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2
            }} />
          <div className='cardConsole' ref='console' style={{display: this.state.consoleOpen ? 'block' : 'none'}} />
          <button className='cardConsoleClose' style={{display: this.state.consoleOpen ? 'block' : 'none'}} onClick={() => this.setState({ consoleOpen: false })}>X</button>
        </div>
        <div className='cardExec'>
          <p className='cardArguments' ref='args' contentEditable suppressContentEditableWarning onBlur={(e) => this.props.editArgs(e.target.innerText)}>{this.props.args}</p>
          <button className='cardExecBtn' onClick={this.run.bind(this)}>▶</button>
        </div>
      </div>
    )
  }
}
