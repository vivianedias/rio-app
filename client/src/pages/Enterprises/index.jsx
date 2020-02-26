import React, { useEffect } from "react"
import { Link } from 'react-router-dom' 
import { useStoreState, useStoreActions } from 'easy-peasy'
import uuid from "uuid"

import { Container, Group, Title, Background, GroupButton } from './style'
import CardEnterprise from '../../components/CardEnterprise'
import Alert from '@material-ui/lab/Alert'
import { IfElse } from '../../components/If'
import Tables from '../../comps/Tables'
import Button from '../../comps/Button'

const headCells = [
  { id: 'name_enterprise', numeric: false, disablePadding: true, label: 'Empresa' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Responsável' },
  { id: 'email', numeric: false, disablePadding: false, label: 'E-mail' },
  { id: 'carbs', numeric: false, disablePadding: false, label: 'Telefone' },
  { id: 'protein', numeric: false, disablePadding: false, label: 'Segmento' },
  { id: 'actions', numeric: false, disablePadding: false, label: '' },
];

const EnterprisesList = () => {
  const enterprises = useStoreState(state => state.enterprise.enterprises)
  const getAllEnterprises = useStoreActions(actions => actions.enterprise.getAllEnterpriseUsers)

  useEffect(() => {
    getAllEnterprises()
  }, [getAllEnterprises])

  const clearList = enterprises
    // .filter(ent => ent.name_enterprise)
    .map(ent => ({
    name_enterprise: ent.name_enterprise,
    name: ent.name,
    email: ent.email,
    phone: ent.phone,
    segments: ent.business_segments
  }))
  return (
    <Background className="container clearfix et_menu_container">
      <Container>
        <GroupButton>
          <Link to="/busca/empresas">
            <Button
              variant="contained"
            >Buscar Empresas</Button>
          </Link>
        </GroupButton>
        <Group>
          <IfElse
            condition={
              typeof enterprises !== 'undefined' && enterprises.length > 0
            }
            True={
              // enterprises.map((enterprise) => enterprise && (
              <Tables 
                title="Empresas"
                headCells={headCells}
                list={clearList} 
              />
              // <CardEnterprise
              //   name={enterprise.enterprise_name}
              //   phone={enterprise.phone}
              //   email={enterprise.email}
              //   id={enterprise.enterprise_id}
              //   key={uuid()}
              // /> 
            }
            // ))}
            False={
              <Alert severity="warning">Não há empresas cadastradas</Alert>
            }
          />
        </Group>
      </Container>
    </Background>
  )
}

export default EnterprisesList
