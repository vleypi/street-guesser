import React from 'react'
import style from '../../styles/countries.module.css'
import ae from '../../image/countries/ae.svg'
import al from '../../image/countries/al.svg'
import am from '../../image/countries/am.svg'
import ar from '../../image/countries/ar.svg'
import at from '../../image/countries/at.svg'
import au from '../../image/countries/au.svg'
import az from '../../image/countries/az.svg'
import bd from '../../image/countries/bd.svg'
import be from '../../image/countries/be.svg'
import bg from '../../image/countries/bg.svg'
import bm from '../../image/countries/bm.svg'
import bo from '../../image/countries/bo.svg'
import br from '../../image/countries/br.svg'
import bt from '../../image/countries/bt.svg'
import ca from '../../image/countries/ca.svg'
import ch from '../../image/countries/ch.svg'
import cl from '../../image/countries/cl.svg'
import co from '../../image/countries/co.svg'
import cy from '../../image/countries/cy.svg'
import cz from '../../image/countries/cz.svg'
import de from '../../image/countries/de.svg'
import dk from '../../image/countries/dk.svg'
import ec from '../../image/countries/ec.svg'
import es from '../../image/countries/es.svg'
import ee from '../../image/countries/ee.svg'
import fi from '../../image/countries/fi.svg'
import fr from '../../image/countries/fr.svg'
import gb from '../../image/countries/gb.svg'
import gh from '../../image/countries/gh.svg'
import gl from '../../image/countries/gl.svg'
import gr from '../../image/countries/gr.svg'
import gt from '../../image/countries/gt.svg'
import hr from '../../image/countries/hr.svg'
import hu from '../../image/countries/hu.svg'
import id from '../../image/countries/id.svg'
import ie from '../../image/countries/ie.svg'
import il from '../../image/countries/il.svg'
import ind from '../../image/countries/in.svg'
import is from '../../image/countries/is.svg'
import it from '../../image/countries/it.svg'
import jp from '../../image/countries/jp.svg'
import ke from '../../image/countries/ke.svg'
import kr from '../../image/countries/kr.svg'
import kz from '../../image/countries/kz.svg'
import lk from '../../image/countries/lk.svg'
import ls from '../../image/countries/ls.svg'
import lu from '../../image/countries/lu.svg'
import lv from '../../image/countries/lv.svg'
import lt from '../../image/countries/lt.svg'
import mk from '../../image/countries/mk.svg'
import mn from '../../image/countries/mn.svg'
import mx from '../../image/countries/mx.svg'
import my from '../../image/countries/my.svg'
import nl from '../../image/countries/nl.svg'
import no from '../../image/countries/no.svg'
import nz from '../../image/countries/nz.svg'
import pe from '../../image/countries/pe.svg'
import ph from '../../image/countries/ph.svg'
import pl from '../../image/countries/pl.svg'
import pr from '../../image/countries/pr.svg'
import pt from '../../image/countries/pt.svg'
import ro from '../../image/countries/ro.svg'
import rs from '../../image/countries/rs.svg'
import ru from '../../image/countries/ru.svg'
import se from '../../image/countries/se.svg'
import sg from '../../image/countries/sg.svg'
import sk from '../../image/countries/sk.svg'
import si from '../../image/countries/si.svg'
import sz from '../../image/countries/sz.svg'
import th from '../../image/countries/th.svg'
import tr from '../../image/countries/tr.svg'
import tw from '../../image/countries/tw.svg'
import ua from '../../image/countries/ua.svg'
import us from '../../image/countries/us.svg'
import uy from '../../image/countries/uy.svg'
import vn from '../../image/countries/vn.svg'
import za from '../../image/countries/za.svg'
import world from '../../image/world.svg'
import { useHistory } from 'react-router'

export const countriesList = [
    {option: 'world', name: 'World', img: world},
    {option: 'ae', name: 'United Arab Emirates', img: ae},
    {option: 'al', name: 'Albania', img: ae, img: al},
    {option: 'am', name: 'Armenia', img: am},
    {option: 'ar', name: 'Argentina', img: ar},
    {option: 'au', name: 'Australia', img: au},
    {option: 'at', name: 'Austria', img: at},
    {option: 'az', name: 'Azerbaijan', img: az},
    {option: 'be', name: 'Belgium', img: be},
    {option: 'bd', name: 'Bangladesh', img: bd},
    {option: 'bg', name: 'Bulgaria', img: bg},
    {option: 'bm', name: 'Bermuda', img: bm},
    {option: 'bo', name: 'Bolivia', img: bo},
    {option: 'br', name: 'Brazil', img: br},
    {option: 'bt', name: 'Bhutan', img: bt},
    {option: 'ca', name: 'Canada', img: ca},
    {option: 'ch', name: 'Switzerland', img: ch},
    {option:'cl', name: 'Chile', img: cl},
    {option: 'co', name: 'Colombia', img: co},
    {option: 'cy', name: 'Cyprus', img: cy},
    {option:'cz', name: 'Czech Republic', img: cz},
    {option: 'de', name: 'Germany', img: de},
    {option: 'dk', name: 'Denmark', img: dk},
    {option: 'ec', name: 'Ecuador', img: ec},
    {option: 'es', name: 'Spain', img: es},
    {option: 'ee', name: 'Estonia', img: ee},
    {option: 'fi', name: 'Finland', img: fi},
    {option: 'fr', name: 'France', img: fr},
    {option: 'gb', name: 'United Kingdom', img: gb},
    {option: 'gh', name: 'Ghana', img: gh},
    {option: 'gr', name: 'Greece', img: gr},
    {option: 'gl', name: 'Greenland', img: gl},
    {option: 'gt', name: 'Guatemala', img: gt},
    {option: 'hr', name: 'Croatia', img: hr},
    {option: 'hu', name: 'Hungary', img: hu},
    {option: 'id', name: 'Indonesia', img: id},
    {option: 'in', name: 'India', img: ind},
    {option: 'ie', name: 'Ireland', img: ie},
    {option: 'is', name: 'Iceland', img: is},
    {option: 'il', name: 'Israel', img: il},
    {option: 'it', name: 'Italy', img: it},  
    {option: 'jp', name: 'Japan', img: jp},
    {option: 'kz', name: 'Kazakhstan', img: kz},
    {option: 'ke', name: 'Kenya', img: ke},
    {option: 'kr', name: 'South Korea', img: kr},
    {option: 'ls', name: 'Lesotho', img: ls},
    {option: 'lk', name: 'Sri Lanka', img: lk},
    {option: 'lt', name: 'Lithuania', img: lt},
    {option: 'lu', name: 'Luxembourg', img: lu},
    {option: 'lv', name: 'Latvia', img: lv},
    {option: 'mx', name: 'Mexico', img: mx},
    {option: 'mk', name: 'Macedonia', img: mk},
    {option: 'mn', name: 'Mongolia', img: mn},
    {option: 'sg', name: 'Singapore', img: sg},
    {option: 'my', name: 'Malaysia', img: my},
    {option: 'nl', name: 'Netherlands', img: nl},
    {option: 'no', name: 'Norway', img: no},
    {option: 'nz', name: 'New Zealand', img: nz},
    {option:'pe', name: 'Peru', img: pe},
    {option: 'ph', name: 'Philippines', img: ph},
    {option: 'pl', name: 'Poland', img: pl},
    {option: 'pr', name: 'Puerto Rico', img: pr},
    {option: 'pt', name: 'Portugal', img: pt},
    {option:'ro', name: 'Romania', img: ro},
    {option: 'ru', name: 'Russia', img: ru},
    {option: 'rs', name: 'Republic of Serbia', img: rs},
    {option: 'sk', name: 'Slovakia', img: sk},
    {option: 'si', name: 'Slovenia', img: si},
    {option: 'se', name: 'Sweden', img: se},
    {option: 'sz', name: 'Swaziland', img: sz},
    {option: 'th', name: 'Thailand', img: th},
    {option: 'tr', name: 'Turkey', img: tr},
    {option: 'tw', name: 'Taiwan', img: tw},
    {option: 'ua', name: 'Ukraine', img: ua},
    {option: 'uy', name: 'Uruguay', img: uy},
    {option: 'us', name: 'USA', img: us},
    {option: 'vn', name: 'Vietnam', img: vn},
    {option: 'za', name: 'South Africa', img: za},
]

const CountriesLIST = () => {

    const history = useHistory()
    const [show,setShow] = React.useState(false)
    const route = (it) =>{
        history.push(`/create/Points/${it.name}`)
    }
    return (
        <>
        <button
            onClick={()=>setShow(!show)}
            className={`${style.showCountries}`}
        >
            {show ? 'close' : 'list'}
        </button>
        <div className={`${style.CountriesLIST} ${show && style.CountriesLISTSHOW}`}>
            <h1>List of all countries</h1>
            <div className={style.scrollCountries}>
                {countriesList.map((it)=>(
                    <div onClick={()=>route(it)} className={style.countriesITEM}>
                        <img src={it.img} />
                        <p>{it.name}</p>
                    </div>
                ))}
                <div>
                    <p style={{fontSize: '11px', margin: '10px 0'}}>Not all countries have enough cameras to play them.</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default CountriesLIST
